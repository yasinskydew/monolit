import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { Keyword } from '../database/entities';

@Injectable()
export class KeywordService extends BaseCrudService<Keyword> {
  constructor(
    @InjectCrudRepository(Keyword)
    repository: CrudRepository<Keyword>,
  ) {
    super(repository);
  }
}
