import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { CompanyName } from '../database/entities';
import { CompanyNameController } from './company-name.controller';
import { CompanyNameService } from './company-name.service';

@Module({
  imports: [DatabaseModule.forFeature([CompanyName])],
  controllers: [CompanyNameController],
  providers: [CompanyNameService],
  exports: [CompanyNameService],
})
export class CompanyNameModule {}
