import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMovieKeywordDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @Type(() => Number)
  @IsInt()
  movie_id: number;

  @Type(() => Number)
  @IsInt()
  keyword_id: number;
}
