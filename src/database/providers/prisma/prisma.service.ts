import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import {
  Prisma,
  PrismaClient,
} from '../../../generated/prisma/client';
import {
  QueryFileLogger,
  isQueryFileLoggingEnabled,
} from '../../logging';
import { getPostgresUrl } from '../../postgres.config';

type PrismaClientWithQueryLog = PrismaClient & {
  $on(
    eventType: 'query',
    callback: (event: Prisma.QueryEvent) => void,
  ): void;
};

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(configService: ConfigService) {
    const pool = new Pool({ connectionString: getPostgresUrl(configService) });
    const adapter = new PrismaPg(pool);
    const fileLogging = isQueryFileLoggingEnabled();

    super({
      adapter,
      log: fileLogging ? [{ emit: 'event', level: 'query' }] : [],
    });

    this.pool = pool;

    if (fileLogging) {
      const queryLog = QueryFileLogger.getInstance();
      (this as PrismaClientWithQueryLog).$on('query', (event) => {
        queryLog.write('prisma', event.query, event.params, event.duration);
      });
    }
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    await this.pool.end();
  }
}
