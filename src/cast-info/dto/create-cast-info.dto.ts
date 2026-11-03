import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCastInfoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @Type(() => Number)
  @IsInt()
  person_id: number;

  @Type(() => Number)
  @IsInt()
  movie_id: number;

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

  @Type(() => Number)
  @IsInt()
  role_id: number;
}
