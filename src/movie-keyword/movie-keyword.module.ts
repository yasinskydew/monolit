import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { MovieKeyword } from '../database/entities';
import { MovieKeywordController } from './movie-keyword.controller';
import { MovieKeywordService } from './movie-keyword.service';

@Module({
  imports: [DatabaseModule.forFeature([MovieKeyword])],
  controllers: [MovieKeywordController],
  providers: [MovieKeywordService],
  exports: [MovieKeywordService],
})
export class MovieKeywordModule {}
