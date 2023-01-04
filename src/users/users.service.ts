import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const id = randomUUID();
    const isDeleted = false;
    const newUser: User = { ...createUserDto, id, isDeleted };
    this.users.push(newUser);
    return newUser;
  }

  async getAutoSuggestUsers(query: QueryDto) {
    let users = this.users;
    if (users) {
      if (query.loginSubstring) {
        users = users.filter((user) =>
          user.login.includes(query.loginSubstring),
        );
      }
      users.sort((a, b) => a.login.localeCompare(b.login));
      users = users.slice(0, query.limit);
    }
    return users;
  }

  async findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const updatedUser: User = { ...user, ...updateUserDto };

    this.users.forEach((u, i) => {
      if (u.id === user.id) {
        this.users[i] = updatedUser;
      }
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user || user.isDeleted === true) {
      return null;
    }

    user.isDeleted = true;
    this.users.forEach((u, i) => {
      if (u.id === user.id) {
        this.users[i] = user;
      }
    });
    return user;
  }
}
