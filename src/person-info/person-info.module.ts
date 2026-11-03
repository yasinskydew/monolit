import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonInfo } from '../entities/person-info.entity';
import { PersonInfoController } from './person-info.controller';
import { PersonInfoService } from './person-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonInfo])],
  controllers: [PersonInfoController],
  providers: [PersonInfoService],
  exports: [PersonInfoService],
})
export class PersonInfoModule {}
