import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { MovieCompanies } from '../database/entities';
import { MovieCompaniesController } from './movie-companies.controller';
import { MovieCompaniesService } from './movie-companies.service';

@Module({
  imports: [DatabaseModule.forFeature([MovieCompanies])],
  controllers: [MovieCompaniesController],
  providers: [MovieCompaniesService],
  exports: [MovieCompaniesService],
})
export class MovieCompaniesModule {}
