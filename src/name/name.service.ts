import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { Name } from '../database/entities';

@Injectable()
export class NameService extends BaseCrudService<Name> {
  constructor(
    @InjectCrudRepository(Name)
    repository: CrudRepository<Name>,
  ) {
    super(repository);
  }
}
