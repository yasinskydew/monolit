import { EntityManager } from '@mikro-orm/postgresql';
import { DynamicModule, Provider, Type } from '@nestjs/common';
import { getDrizzleToken } from '@nestjs/drizzle';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Model, ModelStatic } from 'sequelize';
import { Repository } from 'typeorm';
import { resolveDbProvider } from '../database.types';
import {
  drizzleQueryKey,
  drizzleTableByEntityName,
  mikroOrmEntityByTokenName,
  sequelizeModelByTokenName,
} from '../providers/entity-registry';
import { DrizzleCrudRepository } from '../providers/drizzle/drizzle.crud-repository';
import { MikroOrmCrudRepository } from '../providers/mikroorm/mikroorm.crud-repository';
import { PrismaCrudRepository } from '../providers/prisma/prisma.crud-repository';
import { PrismaService } from '../providers/prisma/prisma.service';
import { SequelizeCrudRepository } from '../providers/sequelize/sequelize.crud-repository';
import { TypeOrmCrudRepository } from '../providers/typeorm/typeorm.crud-repository';
import { getCrudRepositoryToken } from './crud.tokens';
import { EntityClass } from './crud.types';

class DatabaseFeatureModule {}

function crudTokens(entities: EntityClass[]): string[] {
  return entities.map((entity) => getCrudRepositoryToken(entity));
}

function createTypeOrmFeature(entities: EntityClass[]): DynamicModule {
  const providers: Provider[] = entities.map((entity) => ({
    provide: getCrudRepositoryToken(entity),
    useFactory: (repository: Repository<object & { id: number }>) =>
      new TypeOrmCrudRepository(repository),
    inject: [getRepositoryToken(entity as Type<object & { id: number }>)],
  }));

  return {
    module: DatabaseFeatureModule,
    imports: [TypeOrmModule.forFeature(entities as Type[])],
    providers,
    exports: [...crudTokens(entities), TypeOrmModule],
  };
}

function createMikroOrmFeature(entities: EntityClass[]): DynamicModule {
  const providers: Provider[] = entities.map((token) => {
    const mikroEntity = mikroOrmEntityByTokenName[token.name];
    if (!mikroEntity) {
      throw new Error(`MikroORM entity missing for token ${token.name}`);
    }
    return {
      provide: getCrudRepositoryToken(token),
      useFactory: (em: EntityManager) =>
        new MikroOrmCrudRepository(em, mikroEntity),
      inject: [EntityManager],
    };
  });

  return {
    module: DatabaseFeatureModule,
    providers,
    exports: crudTokens(entities),
  };
}

function createSequelizeFeature(entities: EntityClass[]): DynamicModule {
  const models = entities.map((token) => {
    const model = sequelizeModelByTokenName[token.name];
    if (!model) {
      throw new Error(`Sequelize model missing for token ${token.name}`);
    }
    return model as Type;
  });

  const providers: Provider[] = entities.map((token) => {
    const model = sequelizeModelByTokenName[token.name] as Type;
    return {
      provide: getCrudRepositoryToken(token),
      useFactory: (sequelizeModel: ModelStatic<Model>) =>
        new SequelizeCrudRepository(sequelizeModel),
      inject: [getModelToken(model)],
    };
  });

  return {
    module: DatabaseFeatureModule,
    imports: [SequelizeModule.forFeature(models)],
    providers,
    exports: [...crudTokens(entities), SequelizeModule],
  };
}

function createPrismaFeature(entities: EntityClass[]): DynamicModule {
  const providers: Provider[] = entities.map((token) => ({
    provide: getCrudRepositoryToken(token),
    useFactory: (prisma: PrismaService) =>
      new PrismaCrudRepository(prisma, token.name),
    inject: [PrismaService],
  }));

  return {
    module: DatabaseFeatureModule,
    providers,
    exports: crudTokens(entities),
  };
}

function createDrizzleFeature(entities: EntityClass[]): DynamicModule {
  const providers: Provider[] = entities.map((token) => {
    const table = drizzleTableByEntityName[token.name];
    if (!table) {
      throw new Error(`Drizzle table missing for token ${token.name}`);
    }
    const queryKey = drizzleQueryKey(token.name);
    return {
      provide: getCrudRepositoryToken(token),
      useFactory: (db: unknown) =>
        new DrizzleCrudRepository(db, table, queryKey),
      inject: [getDrizzleToken()],
    };
  });

  return {
    module: DatabaseFeatureModule,
    providers,
    exports: crudTokens(entities),
  };
}

export function createDatabaseFeatureModule(
  entities: EntityClass[],
): DynamicModule {
  const provider = resolveDbProvider();
  console.log('Provider connected', provider)
  switch (provider) {
    case 'drizzle':
      return createDrizzleFeature(entities);
    case 'sequelize':
      return createSequelizeFeature(entities);
    case 'prisma':
      return createPrismaFeature(entities);
    case 'mikroorm':
      return createMikroOrmFeature(entities);
    case 'typeorm':
    default:
      return createTypeOrmFeature(entities);
  }
}
