import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { CharName } from '../database/entities';
import { CharNameController } from './char-name.controller';
import { CharNameService } from './char-name.service';

@Module({
  imports: [DatabaseModule.forFeature([CharName])],
  controllers: [CharNameController],
  providers: [CharNameService],
  exports: [CharNameService],
})
export class CharNameModule {}
