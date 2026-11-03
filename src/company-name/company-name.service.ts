import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { CompanyName } from '../entities/company-name.entity';

@Injectable()
export class CompanyNameService extends BaseCrudService<CompanyName> {
  constructor(
    @InjectRepository(CompanyName)
    repository: Repository<CompanyName>,
  ) {
    super(repository);
  }
}
