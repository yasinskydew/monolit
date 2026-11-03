import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { CastInfo } from '../entities/cast-info.entity';

@Injectable()
export class CastInfoService extends BaseCrudService<CastInfo> {
  constructor(
    @InjectRepository(CastInfo)
    repository: Repository<CastInfo>,
  ) {
    super(repository);
  }
}
