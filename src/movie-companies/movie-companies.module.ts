import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCompanies } from '../entities/movie-companies.entity';
import { MovieCompaniesController } from './movie-companies.controller';
import { MovieCompaniesService } from './movie-companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCompanies])],
  controllers: [MovieCompaniesController],
  providers: [MovieCompaniesService],
  exports: [MovieCompaniesService],
})
export class MovieCompaniesModule {}
