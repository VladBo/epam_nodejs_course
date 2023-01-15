import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../enums';
import { User } from '../../users/entities';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly permissions: Permission[];

  @IsArray()
  readonly users: User[];
}
