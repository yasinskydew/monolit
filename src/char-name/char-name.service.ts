import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { CharName } from '../entities/char-name.entity';

@Injectable()
export class CharNameService extends BaseCrudService<CharName> {
  constructor(
    @InjectRepository(CharName)
    repository: Repository<CharName>,
  ) {
    super(repository);
  }
}
