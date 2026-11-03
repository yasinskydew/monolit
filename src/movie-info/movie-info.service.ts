import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { MovieInfo } from '../entities/movie-info.entity';

@Injectable()
export class MovieInfoService extends BaseCrudService<MovieInfo> {
  constructor(
    @InjectRepository(MovieInfo)
    repository: Repository<MovieInfo>,
  ) {
    super(repository);
  }
}
