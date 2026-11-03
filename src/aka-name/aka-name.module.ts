import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AkaName } from '../entities/aka-name.entity';
import { AkaNameController } from './aka-name.controller';
import { AkaNameService } from './aka-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([AkaName])],
  controllers: [AkaNameController],
  providers: [AkaNameService],
  exports: [AkaNameService],
})
export class AkaNameModule {}
