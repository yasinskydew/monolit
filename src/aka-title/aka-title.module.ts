import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AkaTitle } from '../entities/aka-title.entity';
import { AkaTitleController } from './aka-title.controller';
import { AkaTitleService } from './aka-title.service';

@Module({
  imports: [TypeOrmModule.forFeature([AkaTitle])],
  controllers: [AkaTitleController],
  providers: [AkaTitleService],
  exports: [AkaTitleService],
})
export class AkaTitleModule {}
