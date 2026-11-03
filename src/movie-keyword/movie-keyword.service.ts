import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { MovieKeyword } from '../entities/movie-keyword.entity';

@Injectable()
export class MovieKeywordService extends BaseCrudService<MovieKeyword> {
  constructor(
    @InjectRepository(MovieKeyword)
    repository: Repository<MovieKeyword>,
  ) {
    super(repository);
  }
}
