import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { parseRelations } from '../common/crud/parse-relations';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePersonInfoDto } from './dto/create-person-info.dto';
import { UpdatePersonInfoDto } from './dto/update-person-info.dto';
import { PersonInfoService } from './person-info.service';

@ApiTags('person-info')
@Controller('person-info')
export class PersonInfoController {
  constructor(private readonly service: PersonInfoService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(
      query.skip ?? 0,
      query.take ?? 50,
      parseRelations(query.relations),
      query.orderBy ?? 'id',
      query.order ?? 'ASC',
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('relations') relations?: string,
  ) {
    return this.service.findOne(id, parseRelations(relations));
  }

  @Post()
  create(@Body() dto: CreatePersonInfoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersonInfoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
