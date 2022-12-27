import { UserCreateDto } from "./user-create.dto";

export interface UserDto extends UserCreateDto {
  id: string;
}
