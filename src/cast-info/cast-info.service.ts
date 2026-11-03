import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { InjectCrudRepository } from '../database';
import type { CrudRepository } from '../database';
import { CastInfo } from '../database/entities';

@Injectable()
export class CastInfoService extends BaseCrudService<CastInfo> {
  constructor(
    @InjectCrudRepository(CastInfo)
    repository: CrudRepository<CastInfo>,
  ) {
    super(repository);
  }
}
