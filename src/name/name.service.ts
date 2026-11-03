import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Name } from '../entities/name.entity';

@Injectable()
export class NameService extends BaseCrudService<Name> {
  constructor(
    @InjectRepository(Name)
    repository: Repository<Name>,
  ) {
    super(repository);
  }
}
