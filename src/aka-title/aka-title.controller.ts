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
import { CreateAkaTitleDto } from './dto/create-aka-title.dto';
import { UpdateAkaTitleDto } from './dto/update-aka-title.dto';
import { AkaTitleService } from './aka-title.service';

@ApiTags('aka-titles')
@Controller('aka-titles')
export class AkaTitleController {
  constructor(private readonly service: AkaTitleService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(
      query.skip ?? 0,
      query.take ?? 50,
      parseRelations(query.relations),
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
  create(@Body() dto: CreateAkaTitleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAkaTitleDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
