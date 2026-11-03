import { DynamicModule } from '@nestjs/common';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { mikroOrmEntities } from './entities';

/**
 * @mikro-orm/nestjs forRoot is async (Promise<DynamicModule>).
 * Nest accepts Promise<DynamicModule> in imports — do not put it into exports.
 */
export async function createMikroOrmProvider(): Promise<DynamicModule> {
  const logging = process.env.DB_LOGGING === 'true';

  return MikroOrmModule.forRoot({
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 15432),
    user: process.env.DB_USER ?? 'db-nest',
    password: process.env.DB_PASSWORD ?? 'db-nest',
    dbName: process.env.DB_NAME ?? 'db-nest_db',
    entities: [...mikroOrmEntities],
    metadataProvider: ReflectMetadataProvider,
    discovery: { warnWhenNoEntities: false },
    allowGlobalContext: true,
    debug: logging,
  });
}
