import { Injectable, Logger } from '@nestjs/common';
import type { CrudRepository } from '../../database';
import { Title } from '../../database/entities';
import { TitleDocumentRepository } from '../title-read/title-document.repository';
import { toPlainDocument } from './cdc-payload.util';
import {
  SECTION_RELATIONS,
  SLIM_TITLE_RELATIONS,
  TitleProjectionSection,
} from './full-relations';
import { TitleProjectorPersistence } from './title-projector.persistence';

const REBUILD_RETRIES = 3;
const REBUILD_RETRY_MS = 200;

const TITLE_SCALAR_KEYS = [
  'title',
  'imdb_index',
  'kind_id',
  'production_year',
  'imdb_id',
  'phonetic_code',
  'episode_of_id',
  'season_nr',
  'episode_nr',
  'series_years',
  'md5sum',
] as const;

@Injectable()
export class TitleProjector {
  private readonly logger = new Logger(TitleProjector.name);

  constructor(
    private readonly persistence: TitleProjectorPersistence,
    private readonly documents: TitleDocumentRepository,
  ) {}

  private get titles(): CrudRepository<Title> {
    return this.persistence.repository;
  }

  async rebuild(titleId: number): Promise<void> {
    let entity: Title | null = null;
    for (let attempt = 1; attempt <= REBUILD_RETRIES; attempt += 1) {
      entity = await this.titles.findById(titleId, SLIM_TITLE_RELATIONS);
      if (entity) break;
      if (attempt < REBUILD_RETRIES) {
        await new Promise((r) => setTimeout(r, REBUILD_RETRY_MS * attempt));
      }
    }

    if (!entity) {
      await this.documents.delete(titleId);
      this.logger.debug(
        `Title ${titleId} missing on projector DB — removed from Mongo`,
      );
      return;
    }
    const plain = toPlainDocument(entity as object);
    const id = Number(plain.id ?? titleId);
    await this.documents.upsert({ ...plain, id });
  }

  /**
   * Refresh one nested array on an existing Mongo doc.
   * Falls back to full rebuild if the document is missing.
   */
  async rebuildSection(
    titleId: number,
    section: TitleProjectionSection,
  ): Promise<void> {
    const existing = await this.documents.findById(titleId);
    if (!existing) {
      await this.rebuild(titleId);
      return;
    }

    const relations = SECTION_RELATIONS[section];
    let entity: Title | null = null;
    for (let attempt = 1; attempt <= REBUILD_RETRIES; attempt += 1) {
      entity = await this.titles.findById(titleId, relations);
      if (entity) break;
      if (attempt < REBUILD_RETRIES) {
        await new Promise((r) => setTimeout(r, REBUILD_RETRY_MS * attempt));
      }
    }

    if (!entity) {
      await this.documents.delete(titleId);
      return;
    }

    const plain = toPlainDocument(entity as object);
    const patch: Record<string, unknown> = {
      [section]: plain[section] ?? [],
    };
    if (section === 'movieLinks') {
      patch.linkedFrom = plain.linkedFrom ?? [];
    }
    await this.documents.patchFields(titleId, patch);
  }

  /** Patch scalar title fields from a Debezium after-row when doc already exists. */
  async patchTitleScalars(
    titleId: number,
    after: Record<string, unknown>,
  ): Promise<void> {
    const existing = await this.documents.findById(titleId);
    if (!existing) {
      await this.rebuild(titleId);
      return;
    }

    const fields: Record<string, unknown> = {};
    for (const key of TITLE_SCALAR_KEYS) {
      if (key in after) {
        fields[key] = after[key];
      }
    }
    if (Object.keys(fields).length === 0) return;
    await this.documents.patchFields(titleId, fields);
  }

  async delete(titleId: number): Promise<void> {
    await this.documents.delete(titleId);
  }
}
