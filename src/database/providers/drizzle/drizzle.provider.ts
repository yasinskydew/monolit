import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  QueryFileLogger,
  isQueryFileLoggingEnabled,
} from '../../logging';
import { getPostgresConfig } from '../../postgres.config';
import { schema } from './schema';

export function createDrizzleProvider(): DynamicModule {
  return DrizzleModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const pg = getPostgresConfig(config);
      const fileLogging = isQueryFileLoggingEnabled();
      const queryLog = QueryFileLogger.getInstance();
      return {
        drizzle,
        connection: {
          host: pg.host,
          port: pg.port,
          user: pg.username,
          password: pg.password,
          database: pg.database,
        },
        schema,
        logger: fileLogging
          ? {
              logQuery(query: string, params: unknown[]): void {
                queryLog.write('drizzle', query, params);
              },
            }
          : undefined,
      };
    },
  });
}
