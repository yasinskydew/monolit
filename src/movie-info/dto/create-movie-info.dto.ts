import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMovieInfoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @Type(() => Number)
  @IsInt()
  movie_id: number;

  @Type(() => Number)
  @IsInt()
  info_type_id: number;

  @IsString()
  info: string;

  @IsOptional()
  @IsString()
  note?: string | null;
}
