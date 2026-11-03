import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAkaTitleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @Type(() => Number)
  @IsInt()
  movie_id: number;

  @IsOptional()
  @IsString()
  title?: string | null;

  @IsOptional()
  @IsString()
  imdb_index?: string | null;

  @Type(() => Number)
  @IsInt()
  kind_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  production_year?: number | null;

  @IsOptional()
  @IsString()
  phonetic_code?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  episode_of_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  season_nr?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  episode_nr?: number | null;

  @IsOptional()
  @IsString()
  note?: string | null;

  @IsOptional()
  @IsString()
  md5sum?: string | null;
}
