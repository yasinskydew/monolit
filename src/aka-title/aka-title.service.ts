import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { AkaTitle } from '../database/entities';

@Injectable()
export class AkaTitleService extends BaseCrudService<AkaTitle> {
  constructor(
    @InjectCrudRepository(AkaTitle)
    repository: CrudRepository<AkaTitle>,
  ) {
    super(repository);
  }
}
