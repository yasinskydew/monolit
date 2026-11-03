import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { CompanyName } from '../database/entities';

@Injectable()
export class CompanyNameService extends BaseCrudService<CompanyName> {
  constructor(
    @InjectCrudRepository(CompanyName)
    repository: CrudRepository<CompanyName>,
  ) {
    super(repository);
  }
}
