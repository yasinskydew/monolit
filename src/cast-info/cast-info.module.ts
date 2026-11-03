import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastInfo } from '../entities/cast-info.entity';
import { CastInfoController } from './cast-info.controller';
import { CastInfoService } from './cast-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([CastInfo])],
  controllers: [CastInfoController],
  providers: [CastInfoService],
  exports: [CastInfoService],
})
export class CastInfoModule {}
