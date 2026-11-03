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
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { TitleService } from './title.service';

@ApiTags('titles')
@Controller('titles')
export class TitleController {
  constructor(private readonly service: TitleService) {}

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
  create(@Body() dto: CreateTitleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTitleDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
