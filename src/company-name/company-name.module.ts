import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyName } from '../entities/company-name.entity';
import { CompanyNameController } from './company-name.controller';
import { CompanyNameService } from './company-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyName])],
  controllers: [CompanyNameController],
  providers: [CompanyNameService],
  exports: [CompanyNameService],
})
export class CompanyNameModule {}
