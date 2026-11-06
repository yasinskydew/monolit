import { Module } from '@nestjs/common';
import { CqrsModule } from '../cqrs/cqrs.module';
import { DatabaseModule } from '../database';
import { Title } from '../database/entities';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';

@Module({
  imports: [DatabaseModule.forFeature([Title]), CqrsModule],
  controllers: [TitleController],
  providers: [TitleService],
  exports: [TitleService],
})
export class TitleModule {}
