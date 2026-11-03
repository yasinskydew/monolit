import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { MovieCompanies } from '../entities/movie-companies.entity';

@Injectable()
export class MovieCompaniesService extends BaseCrudService<MovieCompanies> {
  constructor(
    @InjectRepository(MovieCompanies)
    repository: Repository<MovieCompanies>,
  ) {
    super(repository);
  }
}
