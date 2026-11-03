import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCharNameDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imdb_index?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  imdb_id?: number | null;

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
