import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { AkaTitle } from '../database/entities';
import { AkaTitleController } from './aka-title.controller';
import { AkaTitleService } from './aka-title.service';

@Module({
  imports: [DatabaseModule.forFeature([AkaTitle])],
  controllers: [AkaTitleController],
  providers: [AkaTitleService],
  exports: [AkaTitleService],
})
export class AkaTitleModule {}
