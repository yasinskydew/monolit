import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { MovieKeyword } from '../database/entities';

@Injectable()
export class MovieKeywordService extends BaseCrudService<MovieKeyword> {
  constructor(
    @InjectCrudRepository(MovieKeyword)
    repository: CrudRepository<MovieKeyword>,
  ) {
    super(repository);
  }
}
