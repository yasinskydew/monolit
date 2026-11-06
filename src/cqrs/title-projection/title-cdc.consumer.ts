import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import {
  parseDebeziumMessage,
  tableFromTopic,
} from './cdc-payload.util';
import { TitleProjectionSection } from './full-relations';
import { mapLimit } from './map-limit';
import { TitleIdResolver } from './title-id-resolver';
import { TitleProjector } from './title.projector';

const CDC_TABLES = [
  'title',
  'cast_info',
  'name',
  'person_info',
  'aka_title',
  'movie_companies',
  'movie_info',
  'movie_info_idx',
  'movie_keyword',
  'movie_link',
  'complete_cast',
  'kind_type',
  'char_name',
  'role_type',
  'info_type',
  'company_name',
  'company_type',
  'keyword',
  'link_type',
  'comp_cast_type',
] as const;

type PendingSection = {
  titleId: number;
  section: TitleProjectionSection;
};

type PendingPatch = {
  titleId: number;
  fields: Record<string, unknown>;
};

@Injectable()
export class TitleCdcConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TitleCdcConsumer.name);
  private consumer: Consumer | null = null;
  private running = false;
  private readonly pendingRebuild = new Set<number>();
  private readonly pendingDelete = new Set<number>();
  private readonly pendingSections = new Map<
    string,
    PendingSection
  >();
  private readonly pendingPatches = new Map<number, PendingPatch>();
  private flushTimer: NodeJS.Timeout | null = null;
  private flushing = false;
  private debounceMs = 12_000;
  private flushConcurrency = 6;
  private flushBatchSize = 40;

  constructor(
    private readonly config: ConfigService,
    private readonly resolver: TitleIdResolver,
    private readonly projector: TitleProjector,
  ) {}

  async onModuleInit(): Promise<void> {
    const readStore = this.config.get<string>('TITLE_READ_STORE', 'orm');
    if (readStore !== 'mongo') {
      this.logger.log('TITLE_READ_STORE!=mongo — CDC consumer disabled');
      return;
    }

    const brokers = (this.config.get<string>('KAFKA_BROKERS') ??
      'localhost:19092')
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    const groupId =
      this.config.get<string>('KAFKA_CDC_GROUP') ??
      'db-nest-title-projector';
    const prefix =
      this.config.get<string>('KAFKA_CDC_TOPIC_PREFIX') ?? 'db-nest';
    const topics = CDC_TABLES.map((t) => `${prefix}.public.${t}`);

    const kafka = new Kafka({
      clientId: 'db-nest-title-cdc',
      brokers,
      connectionTimeout: 10_000,
      requestTimeout: 60_000,
      retry: {
        retries: 15,
        initialRetryTime: 300,
        maxRetryTime: 30_000,
      },
    });

    this.consumer = kafka.consumer({
      groupId,
      sessionTimeout: 60_000,
      heartbeatInterval: 5_000,
      maxWaitTimeInMs: 5_000,
      retry: {
        retries: 15,
        initialRetryTime: 300,
        maxRetryTime: 30_000,
        restartOnFailure: async (error) => {
          this.logger.warn(
            `CDC consumer crash, will restart: ${error.message}`,
          );
          await new Promise((r) => setTimeout(r, 3_000));
          return this.running;
        },
      },
    });

    const topicPattern = new RegExp(
      `^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.public\\.`,
    );

    const fromBeginning =
      (this.config.get<string>('KAFKA_CDC_FROM_BEGINNING') ?? 'true') ===
      'true';
    this.debounceMs = Number(
      this.config.get<string>('KAFKA_CDC_DEBOUNCE_MS') ?? 12_000,
    );
    if (!Number.isFinite(this.debounceMs) || this.debounceMs < 0) {
      this.debounceMs = 12_000;
    }
    this.flushConcurrency = Number(
      this.config.get<string>('KAFKA_CDC_FLUSH_CONCURRENCY') ?? 6,
    );
    if (!Number.isFinite(this.flushConcurrency) || this.flushConcurrency < 1) {
      this.flushConcurrency = 6;
    }
    this.flushBatchSize = Number(
      this.config.get<string>('KAFKA_CDC_FLUSH_BATCH') ?? 40,
    );
    if (!Number.isFinite(this.flushBatchSize) || this.flushBatchSize < 1) {
      this.flushBatchSize = 40;
    }

    try {
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: topicPattern,
        fromBeginning,
      });
      this.running = true;
      void this.consumer.run({
        autoCommit: true,
        autoCommitInterval: 5_000,
        autoCommitThreshold: 100,
        partitionsConsumedConcurrently: 1,
        eachMessage: async (payload) => this.handleMessage(payload, prefix),
      });
      this.logger.log(
        `CDC consumer subscribed to /${topicPattern.source}/ (${groupId}); fromBeginning=${fromBeginning}; debounceMs=${this.debounceMs}; concurrency=${this.flushConcurrency}; batch=${this.flushBatchSize}; expected tables=${topics.length}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to start CDC consumer: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.running = false;
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    await this.flushPending();
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }

  private scheduleFlush(): void {
    if (this.flushTimer) return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      void this.flushPending();
    }, this.debounceMs);
  }

  private sectionKey(titleId: number, section: TitleProjectionSection): string {
    return `${titleId}:${section}`;
  }

  private takeBatch<T>(items: T[], size: number): T[] {
    return items.splice(0, size);
  }

  private async flushPending(): Promise<void> {
    if (this.flushing) return;
    this.flushing = true;
    try {
      const deletes = [...this.pendingDelete];
      this.pendingDelete.clear();
      await mapLimit(deletes, this.flushConcurrency, async (titleId) => {
        this.pendingRebuild.delete(titleId);
        for (const key of [...this.pendingSections.keys()]) {
          if (key.startsWith(`${titleId}:`)) {
            this.pendingSections.delete(key);
          }
        }
        this.pendingPatches.delete(titleId);
        await this.projector.delete(titleId);
      });

      // Full rebuilds win over section/patch for the same title
      const rebuildAll = [...this.pendingRebuild];
      this.pendingRebuild.clear();
      const rebuildBatch = this.takeBatch(rebuildAll, this.flushBatchSize);
      for (const titleId of rebuildBatch) {
        for (const key of [...this.pendingSections.keys()]) {
          if (key.startsWith(`${titleId}:`)) {
            this.pendingSections.delete(key);
          }
        }
        this.pendingPatches.delete(titleId);
      }
      // leftover rebuilds stay pending
      for (const titleId of rebuildAll) {
        this.pendingRebuild.add(titleId);
      }

      await mapLimit(rebuildBatch, this.flushConcurrency, async (titleId) => {
        await this.projector.rebuild(titleId);
      });

      const patches = [...this.pendingPatches.values()];
      this.pendingPatches.clear();
      const patchBatch = this.takeBatch(patches, this.flushBatchSize);
      for (const leftover of patches) {
        this.pendingPatches.set(leftover.titleId, leftover);
      }
      await mapLimit(patchBatch, this.flushConcurrency, async (item) => {
        if (this.pendingRebuild.has(item.titleId)) return;
        await this.projector.patchTitleScalars(item.titleId, item.fields);
      });

      const sections = [...this.pendingSections.values()];
      this.pendingSections.clear();
      const sectionBatch = this.takeBatch(sections, this.flushBatchSize);
      for (const leftover of sections) {
        this.pendingSections.set(
          this.sectionKey(leftover.titleId, leftover.section),
          leftover,
        );
      }
      await mapLimit(sectionBatch, this.flushConcurrency, async (item) => {
        if (this.pendingRebuild.has(item.titleId)) return;
        await this.projector.rebuildSection(item.titleId, item.section);
      });
    } finally {
      this.flushing = false;
      if (
        this.pendingRebuild.size ||
        this.pendingDelete.size ||
        this.pendingSections.size ||
        this.pendingPatches.size
      ) {
        this.scheduleFlush();
      }
    }
  }

  private async handleMessage(
    payload: EachMessagePayload,
    prefix: string,
  ): Promise<void> {
    if (!this.running) return;
    const table = tableFromTopic(payload.topic, prefix);
    if (!table) return;

    const envelope = parseDebeziumMessage(
      payload.message.value?.toString() ?? null,
    );
    if (!envelope?.op) return;

    try {
      const action = await this.resolver.resolve(table, envelope);
      if (action.type === 'noop') return;
      if (action.type === 'delete') {
        this.pendingDelete.add(action.titleId);
        this.scheduleFlush();
        return;
      }
      if (action.type === 'patchTitle') {
        this.pendingPatches.set(action.titleId, {
          titleId: action.titleId,
          fields: action.fields,
        });
        this.scheduleFlush();
        return;
      }
      if (action.type === 'rebuildSection') {
        for (const titleId of action.titleIds) {
          if (this.pendingRebuild.has(titleId)) continue;
          this.pendingSections.set(this.sectionKey(titleId, action.section), {
            titleId,
            section: action.section,
          });
        }
        this.scheduleFlush();
        return;
      }
      for (const titleId of action.titleIds) {
        this.pendingRebuild.add(titleId);
      }
      this.scheduleFlush();
    } catch (error) {
      this.logger.warn(
        `CDC handle failed table=${table}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}
