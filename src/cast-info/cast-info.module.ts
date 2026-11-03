import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { CastInfo } from '../database/entities';
import { CastInfoController } from './cast-info.controller';
import { CastInfoService } from './cast-info.service';

@Module({
  imports: [DatabaseModule.forFeature([CastInfo])],
  controllers: [CastInfoController],
  providers: [CastInfoService],
  exports: [CastInfoService],
})
export class CastInfoModule {}
