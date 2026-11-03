import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { PersonInfo } from '../entities/person-info.entity';

@Injectable()
export class PersonInfoService extends BaseCrudService<PersonInfo> {
  constructor(
    @InjectRepository(PersonInfo)
    repository: Repository<PersonInfo>,
  ) {
    super(repository);
  }
}
