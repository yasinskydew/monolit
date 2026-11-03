import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Name } from '../database/entities';
import { NameController } from './name.controller';
import { NameService } from './name.service';

@Module({
  imports: [DatabaseModule.forFeature([Name])],
  controllers: [NameController],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
