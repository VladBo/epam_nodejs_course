import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsOptional()
  readonly loginSubstring = '';

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly limit = 100;
}
