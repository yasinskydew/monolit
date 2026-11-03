import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { AkaName } from '../database/entities';
import { AkaNameController } from './aka-name.controller';
import { AkaNameService } from './aka-name.service';

@Module({
  imports: [DatabaseModule.forFeature([AkaName])],
  controllers: [AkaNameController],
  providers: [AkaNameService],
  exports: [AkaNameService],
})
export class AkaNameModule {}
