import { DynamicModule } from '@nestjs/common';
import { DbProvider, resolveDbProvider } from './database.types';
import { createDrizzleProvider } from './providers/drizzle/drizzle.provider';
import { createMikroOrmProvider } from './providers/mikroorm/mikroorm.provider';
import { createPrismaProvider } from './providers/prisma.provider';
import { createSequelizeProvider } from './providers/sequelize/sequelize.provider';
import { createTypeOrmProvider } from './providers/typeorm/typeorm.provider';

/**
 * Factory that returns a Nest DynamicModule for the selected Postgres ORM.
 * Provider is chosen via DB_PROVIDER (default: typeorm).
 * See https://docs.nestjs.com/data/overview
 */
export function createPostgresProvider(
  provider: DbProvider | string = resolveDbProvider(),
): DynamicModule | Promise<DynamicModule> {
  switch (resolveDbProvider(provider)) {
    case 'drizzle':
      return createDrizzleProvider();
    case 'sequelize':
      return createSequelizeProvider();
    case 'prisma':
      return createPrismaProvider();
    case 'mikroorm':
      return createMikroOrmProvider();
    case 'typeorm':
    default:
      return createTypeOrmProvider();
  }
}
