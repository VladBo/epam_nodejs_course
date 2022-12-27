import * as crypto from "crypto";
import { UserDto, UserCreateDto, UsersDto } from "./dto";

const users: UsersDto = {};

export const findAll = async (): Promise<UserDto[]> => Object.values(users);

export const find = async (id: string): Promise<UserDto> => users[id];

export const create = async (user: UserCreateDto): Promise<UserDto> => {
  const id = crypto.randomUUID();
  users[id] = {
    ...user,
    id,
  };

  return users[id];
};

export const update = async (
  id: string,
  userUpdate: UserCreateDto
): Promise<UserDto | null> => {
  const user = await find(id);

  if (!user) {
    return null;
  }

  users[id] = { ...userUpdate, id };

  return users[id];
};

export const remove = async (id: string): Promise<null | void> => {
  const user = await find(id);

  if (!user || user.isDeleted === true) {
    return null;
  }

  user.isDeleted = true;
  users[id] = { ...user, id };
};
