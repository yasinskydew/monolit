import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyNameDto {
  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  country_code?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  imdb_id?: number | null;

  @IsOptional()
  @IsString()
  name_pcode_nf?: string | null;

  @IsOptional()
  @IsString()
  name_pcode_sf?: string | null;

  @IsOptional()
  @IsString()
  md5sum?: string | null;
}
