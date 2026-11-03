import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieInfo } from '../entities/movie-info.entity';
import { MovieInfoController } from './movie-info.controller';
import { MovieInfoService } from './movie-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieInfo])],
  controllers: [MovieInfoController],
  providers: [MovieInfoService],
  exports: [MovieInfoService],
})
export class MovieInfoModule {}
