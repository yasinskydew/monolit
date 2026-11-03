import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { Title } from '../database/entities';

@Injectable()
export class TitleService extends BaseCrudService<Title> {
  constructor(
    @InjectCrudRepository(Title)
    repository: CrudRepository<Title>,
  ) {
    super(repository);
  }
}
