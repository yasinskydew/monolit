import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMovieCompaniesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @Type(() => Number)
  @IsInt()
  movie_id: number;

  @Type(() => Number)
  @IsInt()
  company_id: number;

  @Type(() => Number)
  @IsInt()
  company_type_id: number;

  @IsOptional()
  @IsString()
  note?: string | null;
}
