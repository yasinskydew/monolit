import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateKeywordDto {
  @IsOptional()
  @IsString()
  keyword?: string | null;

  @IsOptional()
  @IsString()
  phonetic_code?: string | null;
}
