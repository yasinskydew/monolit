import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMovieInfoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  movie_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  info_type_id?: number | null;

  @IsOptional()
  @IsString()
  info?: string | null;

  @IsOptional()
  @IsString()
  note?: string | null;
}
