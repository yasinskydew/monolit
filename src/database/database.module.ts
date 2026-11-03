import { DynamicModule, Module } from '@nestjs/common';
import { createDatabaseFeatureModule } from './crud/for-feature';
import { EntityClass } from './crud/crud.types';
import { createPostgresProvider } from './database.factory';
import { resolveDbProvider } from './database.types';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule | Promise<DynamicModule> {
    const provider = createPostgresProvider(resolveDbProvider());

    if (provider instanceof Promise) {
      return provider.then((mod) => ({
        module: DatabaseModule,
        imports: [mod],
      }));
    }

    return {
      module: DatabaseModule,
      imports: [provider],
    };
  }

  static forFeature(entities: EntityClass[]): DynamicModule {
    return createDatabaseFeatureModule(entities);
  }
}
