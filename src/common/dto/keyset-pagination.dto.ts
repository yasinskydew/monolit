import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class KeySetPaginationDto {
  @ApiPropertyOptional({
    description:
      'Exclusive cursor on orderBy column (last value from previous page)',
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  after?: number;

  @ApiPropertyOptional({ default: 50, maximum: 200 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  take?: number = 50;

  @ApiPropertyOptional({
    description:
      'Comma-separated relation paths, e.g. kindType,castInfos.person.personInfos',
    example: 'kindType,castInfos.person',
  })
  @IsOptional()
  @IsString()
  relations?: string;

  @ApiPropertyOptional({
    default: 'id',
    description: 'Entity column used for keyset cursor and ordering',
    example: 'id',
  })
  @IsOptional()
  @IsString()
  orderBy?: string = 'id';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';
}
