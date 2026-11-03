import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { AkaName } from '../entities/aka-name.entity';

@Injectable()
export class AkaNameService extends BaseCrudService<AkaName> {
  constructor(
    @InjectRepository(AkaName)
    repository: Repository<AkaName>,
  ) {
    super(repository);
  }
}
