import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharName } from '../entities/char-name.entity';
import { CharNameController } from './char-name.controller';
import { CharNameService } from './char-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharName])],
  controllers: [CharNameController],
  providers: [CharNameService],
  exports: [CharNameService],
})
export class CharNameModule {}
