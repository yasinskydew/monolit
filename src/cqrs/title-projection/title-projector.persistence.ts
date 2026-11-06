import { MikroORM } from '@mikro-orm/core';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Model, ModelStatic } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DataSource } from 'typeorm';
import type { CrudRepository } from '../../database';
import { Title } from '../../database/entities';
import { resolveDbProvider } from '../../database/database.types';
import { getProjectorPostgresUrl } from '../../database/postgres.config';
import {
  drizzleQueryKey,
  drizzleTableByEntityName,
  mikroOrmEntityByTokenName,
} from '../../database/providers/entity-registry';
import { DrizzleCrudRepository } from '../../database/providers/drizzle/drizzle.crud-repository';
import { schema } from '../../database/providers/drizzle/schema';
import { MikroOrmCrudRepository } from '../../database/providers/mikroorm/mikroorm.crud-repository';
import { mikroOrmEntities } from '../../database/providers/mikroorm/entities';
import { PrismaCrudRepository } from '../../database/providers/prisma/prisma.crud-repository';
import { PrismaService } from '../../database/providers/prisma/prisma.service';
import { SequelizeCrudRepository } from '../../database/providers/sequelize/sequelize.crud-repository';
import { sequelizeModels } from '../../database/providers/sequelize/models';
import { Title as SequelizeTitle } from '../../database/providers/sequelize/models/title.model';
import { TypeOrmCrudRepository } from '../../database/providers/typeorm/typeorm.crud-repository';
import { entities as typeormEntities } from '../../database/providers/typeorm/entities';
import { Title as TypeOrmTitle } from '../../database/providers/typeorm/entities/title.entity';
import { PrismaClient } from '../../generated/prisma/client';

type ProjectorHandle = {
  repository: CrudRepository<Title>;
  dispose: () => Promise<void>;
};

function parsePostgresUrl(url: string): {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
} {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: Number(u.port || 5432),
    username: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, '').split('?')[0] || 'db-nest_db',
  };
}

async function createPrismaProjector(
  connectionString: string,
): Promise<ProjectorHandle> {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter }) as unknown as PrismaService;
  await prisma.$connect();
  return {
    repository: new PrismaCrudRepository<Title>(prisma, 'Title'),
    dispose: async () => {
      await prisma.$disconnect();
      await pool.end();
    },
  };
}

async function createTypeOrmProjector(
  connectionString: string,
): Promise<ProjectorHandle> {
  const pg = parsePostgresUrl(connectionString);
  const dataSource = new DataSource({
    type: 'postgres',
    host: pg.host,
    port: pg.port,
    username: pg.username,
    password: pg.password,
    database: pg.database,
    entities: typeormEntities,
    synchronize: false,
    logging: false,
  });
  await dataSource.initialize();
  const repository = new TypeOrmCrudRepository<Title>(
    dataSource.getRepository(TypeOrmTitle),
  );
  return {
    repository,
    dispose: async () => {
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
    },
  };
}

async function createSequelizeProjector(
  connectionString: string,
): Promise<ProjectorHandle> {
  const pg = parsePostgresUrl(connectionString);
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: pg.host,
    port: pg.port,
    username: pg.username,
    password: pg.password,
    database: pg.database,
    models: [...sequelizeModels],
    logging: false,
  });
  await sequelize.authenticate();
  const model = sequelize.getRepository(
    SequelizeTitle,
  ) as unknown as ModelStatic<Model>;
  const repository = new SequelizeCrudRepository<Title>(model);
  return {
    repository,
    dispose: async () => {
      await sequelize.close();
    },
  };
}

async function createDrizzleProjector(
  connectionString: string,
): Promise<ProjectorHandle> {
  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });
  const table = drizzleTableByEntityName.Title;
  if (!table) {
    throw new Error('Drizzle Title table missing');
  }
  const repository = new DrizzleCrudRepository<Title>(
    db,
    table,
    drizzleQueryKey('Title'),
  );
  return {
    repository,
    dispose: async () => {
      await pool.end();
    },
  };
}

async function createMikroOrmProjector(
  connectionString: string,
): Promise<ProjectorHandle> {
  const pg = parsePostgresUrl(connectionString);
  const orm = await MikroORM.init({
    driver: PostgreSqlDriver,
    host: pg.host,
    port: pg.port,
    user: pg.username,
    password: pg.password,
    dbName: pg.database,
    entities: [...mikroOrmEntities],
    metadataProvider: ReflectMetadataProvider,
    discovery: { warnWhenNoEntities: false },
    allowGlobalContext: true,
    debug: false,
  });
  const mikroEntity = mikroOrmEntityByTokenName.Title;
  if (!mikroEntity) {
    throw new Error('MikroORM Title entity missing');
  }
  const repository = new MikroOrmCrudRepository<Title>(
    orm.em.fork(),
    mikroEntity,
  );
  return {
    repository,
    dispose: async () => {
      await orm.close(true);
    },
  };
}

@Injectable()
export class TitleProjectorPersistence
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(TitleProjectorPersistence.name);
  private handle: ProjectorHandle | null = null;

  constructor(private readonly config: ConfigService) {}

  get repository(): CrudRepository<Title> {
    if (!this.handle) {
      throw new Error('Title projector persistence is not initialized');
    }
    return this.handle.repository;
  }

  async onModuleInit(): Promise<void> {
    const url = getProjectorPostgresUrl(this.config);
    const provider = resolveDbProvider();
    this.logger.log(
      `Projector Title repository using ${provider} @ ${url.replace(/:[^:@/]+@/, ':***@')}`,
    );

    switch (provider) {
      case 'prisma':
        this.handle = await createPrismaProjector(url);
        break;
      case 'sequelize':
        this.handle = await createSequelizeProjector(url);
        break;
      case 'drizzle':
        this.handle = await createDrizzleProjector(url);
        break;
      case 'mikroorm':
        this.handle = await createMikroOrmProjector(url);
        break;
      case 'typeorm':
      default:
        this.handle = await createTypeOrmProjector(url);
        break;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.handle) {
      await this.handle.dispose();
      this.handle = null;
    }
  }
}
