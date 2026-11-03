import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Keyword } from '../database/entities';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';

@Module({
  imports: [DatabaseModule.forFeature([Keyword])],
  controllers: [KeywordController],
  providers: [KeywordService],
  exports: [KeywordService],
})
export class KeywordModule {}
