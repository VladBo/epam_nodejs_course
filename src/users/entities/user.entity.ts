import {
  IsAlphanumeric,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  readonly password: string;

  @IsInt()
  @Min(4)
  @Max(130)
  readonly age: number;

  @IsBoolean()
  isDeleted: boolean;
}
