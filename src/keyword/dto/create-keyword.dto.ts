import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateKeywordDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number | null;

  @IsString()
  keyword: string;

  @IsOptional()
  @IsString()
  phonetic_code?: string | null;
}
