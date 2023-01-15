import { IsArray, IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities';

export class AddUsersToGroupDto {
  @IsNotEmpty()
  @IsArray()
  readonly users: User[];
}
