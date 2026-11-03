import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { AkaTitle } from '../entities/aka-title.entity';

@Injectable()
export class AkaTitleService extends BaseCrudService<AkaTitle> {
  constructor(
    @InjectRepository(AkaTitle)
    repository: Repository<AkaTitle>,
  ) {
    super(repository);
  }
}
