import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { CharName } from '../database/entities';

@Injectable()
export class CharNameService extends BaseCrudService<CharName> {
  constructor(
    @InjectCrudRepository(CharName)
    repository: CrudRepository<CharName>,
  ) {
    super(repository);
  }
}
