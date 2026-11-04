import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  QueryFileLogger,
  isQueryFileLoggingEnabled,
} from '../../logging';
import { getPostgresConfig } from '../../postgres.config';
import { sequelizeModels } from './models';

export function createSequelizeProvider(): DynamicModule {
  return SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const pg = getPostgresConfig(config);
      const fileLogging = isQueryFileLoggingEnabled();
      const queryLog = QueryFileLogger.getInstance();
      return {
        dialect: 'postgres' as const,
        host: pg.host,
        port: pg.port,
        username: pg.username,
        password: pg.password,
        database: pg.database,
        models: sequelizeModels,
        autoLoadModels: false,
        synchronize: false,
        logging: fileLogging
          ? (sql: string) => queryLog.write('sequelize', sql)
          : false,
      };
    },
  });
}
