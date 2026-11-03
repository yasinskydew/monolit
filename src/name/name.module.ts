import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from '../entities/name.entity';
import { NameController } from './name.controller';
import { NameService } from './name.service';

@Module({
  imports: [TypeOrmModule.forFeature([Name])],
  controllers: [NameController],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
