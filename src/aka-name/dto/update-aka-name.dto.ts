import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAkaNameDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  person_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  imdb_index?: string | null;

  @IsOptional()
  @IsString()
  name_pcode_cf?: string | null;

  @IsOptional()
  @IsString()
  name_pcode_nf?: string | null;

  @IsOptional()
  @IsString()
  surname_pcode?: string | null;

  @IsOptional()
  @IsString()
  md5sum?: string | null;
}
