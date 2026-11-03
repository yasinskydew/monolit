import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Title } from '../entities/title.entity';

@Injectable()
export class TitleService extends BaseCrudService<Title> {
  constructor(
    @InjectRepository(Title)
    repository: Repository<Title>,
  ) {
    super(repository);
  }
}
