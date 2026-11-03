import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Keyword } from '../entities/keyword.entity';

@Injectable()
export class KeywordService extends BaseCrudService<Keyword> {
  constructor(
    @InjectRepository(Keyword)
    repository: Repository<Keyword>,
  ) {
    super(repository);
  }
}
