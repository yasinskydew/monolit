import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMovieCompaniesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  movie_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  company_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  company_type_id?: number | null;

  @IsOptional()
  @IsString()
  note?: string | null;
}
