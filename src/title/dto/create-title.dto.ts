import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTitleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @IsString()
  title: string;

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
  @Type(() => Number)
  @IsInt()
  imdb_id?: number | null;

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
  series_years?: string | null;

  @IsOptional()
  @IsString()
  md5sum?: string | null;
}
