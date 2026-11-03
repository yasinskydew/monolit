import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieKeyword } from '../entities/movie-keyword.entity';
import { MovieKeywordController } from './movie-keyword.controller';
import { MovieKeywordService } from './movie-keyword.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieKeyword])],
  controllers: [MovieKeywordController],
  providers: [MovieKeywordService],
  exports: [MovieKeywordService],
})
export class MovieKeywordModule {}
