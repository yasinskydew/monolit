import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { MovieCompanies } from '../database/entities';

@Injectable()
export class MovieCompaniesService extends BaseCrudService<MovieCompanies> {
  constructor(
    @InjectCrudRepository(MovieCompanies)
    repository: CrudRepository<MovieCompanies>,
  ) {
    super(repository);
  }
}
