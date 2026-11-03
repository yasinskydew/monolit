import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { PersonInfo } from '../database/entities';
import { PersonInfoController } from './person-info.controller';
import { PersonInfoService } from './person-info.service';

@Module({
  imports: [DatabaseModule.forFeature([PersonInfo])],
  controllers: [PersonInfoController],
  providers: [PersonInfoService],
  exports: [PersonInfoService],
})
export class PersonInfoModule {}
