import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCastInfoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  person_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  movie_id?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  person_role_id?: number | null;

  @IsOptional()
  @IsString()
  note?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  nr_order?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  role_id?: number | null;
}
