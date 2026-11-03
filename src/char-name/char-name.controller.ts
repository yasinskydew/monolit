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
import { CreateCharNameDto } from './dto/create-char-name.dto';
import { UpdateCharNameDto } from './dto/update-char-name.dto';
import { CharNameService } from './char-name.service';

@ApiTags('char-names')
@Controller('char-names')
export class CharNameController {
  constructor(private readonly service: CharNameService) {}

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
  create(@Body() dto: CreateCharNameDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCharNameDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
