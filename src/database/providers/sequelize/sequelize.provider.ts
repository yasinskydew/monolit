import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getPostgresConfig } from '../../postgres.config';
import { sequelizeModels } from './models';

export function createSequelizeProvider(): DynamicModule {
  return SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const pg = getPostgresConfig(config);
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
        logging: pg.logging,
      };
    },
  });
}
