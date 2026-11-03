import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { MovieInfo } from '../database/entities';
import { MovieInfoController } from './movie-info.controller';
import { MovieInfoService } from './movie-info.service';

@Module({
  imports: [DatabaseModule.forFeature([MovieInfo])],
  controllers: [MovieInfoController],
  providers: [MovieInfoService],
  exports: [MovieInfoService],
})
export class MovieInfoModule {}
