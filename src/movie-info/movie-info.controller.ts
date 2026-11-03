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
import { CreateMovieInfoDto } from './dto/create-movie-info.dto';
import { UpdateMovieInfoDto } from './dto/update-movie-info.dto';
import { MovieInfoService } from './movie-info.service';

@ApiTags('movie-info')
@Controller('movie-info')
export class MovieInfoController {
  constructor(private readonly service: MovieInfoService) {}

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
  create(@Body() dto: CreateMovieInfoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieInfoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
