import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TypeOrmQueryFileLogger,
  isQueryFileLoggingEnabled,
} from '../../logging';
import { getPostgresConfig } from '../../postgres.config';
import { entities } from './entities';

export function createTypeOrmProvider(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const pg = getPostgresConfig(config);
      const fileLogging = isQueryFileLoggingEnabled();
      return {
        type: 'postgres' as const,
        host: pg.host,
        port: pg.port,
        username: pg.username,
        password: pg.password,
        database: pg.database,
        entities,
        synchronize: false,
        logging: fileLogging,
        logger: fileLogging ? new TypeOrmQueryFileLogger() : undefined,
      };
    },
  });
}
