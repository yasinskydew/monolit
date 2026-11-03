import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { AkaName } from '../database/entities';

@Injectable()
export class AkaNameService extends BaseCrudService<AkaName> {
  constructor(
    @InjectCrudRepository(AkaName)
    repository: CrudRepository<AkaName>,
  ) {
    super(repository);
  }
}
