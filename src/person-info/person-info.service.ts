import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { PersonInfo } from '../database/entities';

@Injectable()
export class PersonInfoService extends BaseCrudService<PersonInfo> {
  constructor(
    @InjectCrudRepository(PersonInfo)
    repository: CrudRepository<PersonInfo>,
  ) {
    super(repository);
  }
}
