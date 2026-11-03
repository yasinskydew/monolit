import { Inject } from '@nestjs/common';
import { EntityClass } from './crud.types';

export const CRUD_REPOSITORY_SUFFIX = 'CrudRepository';

export function getCrudRepositoryToken(entity: EntityClass): string {
  return `${entity.name}${CRUD_REPOSITORY_SUFFIX}`;
}

export const InjectCrudRepository = (entity: EntityClass) =>
  Inject(getCrudRepositoryToken(entity));
