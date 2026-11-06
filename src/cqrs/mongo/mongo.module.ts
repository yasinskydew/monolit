import {
  Global,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';
import { MONGO_CLIENT, MONGO_DB } from './mongo.tokens';

function resolveDbName(mongoUrl: string, override?: string): string {
  if (override) return override;
  try {
    const normalized = mongoUrl.replace(/^mongodb(\+srv)?:\/\//, 'http://');
    const path = new URL(normalized).pathname.replace(/^\//, '');
    return path || 'db-nest_db';
  } catch {
    return 'db-nest_db';
  }
}

class MongoClientShutdown implements OnModuleDestroy {
  constructor(
    @Inject(MONGO_CLIENT) private readonly client: MongoClient,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: MONGO_CLIENT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<MongoClient> => {
        const url = config.get<string>(
          'MONGO_URL',
          'mongodb://db-nest:db-nest@localhost:17017/db-nest_db?authSource=admin',
        );
        const client = new MongoClient(url);
        await client.connect();
        return client;
      },
    },
    {
      provide: MONGO_DB,
      inject: [MONGO_CLIENT, ConfigService],
      useFactory: (client: MongoClient, config: ConfigService): Db => {
        const url = config.get<string>(
          'MONGO_URL',
          'mongodb://db-nest:db-nest@localhost:17017/db-nest_db?authSource=admin',
        );
        return client.db(
          resolveDbName(url, config.get<string>('MONGO_DB_NAME')),
        );
      },
    },
    MongoClientShutdown,
  ],
  exports: [MONGO_CLIENT, MONGO_DB],
})
export class MongoModule {}
