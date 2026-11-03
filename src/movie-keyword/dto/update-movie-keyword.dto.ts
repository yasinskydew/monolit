import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMovieKeywordDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  movie_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  keyword_id?: number | null;
}
