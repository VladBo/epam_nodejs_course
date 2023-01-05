import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    const id = randomUUID();
    const isDeleted = false;
    const newUser: User = { ...createUserDto, id, isDeleted };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const updatedUser: User = { ...user, ...updateUserDto };

    const userIndex = this.users.findIndex((u) => u.id === user.id);
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const user = await this.findOne(id);

    if (!user || user.isDeleted === true) {
      return null;
    }

    user.isDeleted = true;

    const userIndex = this.users.findIndex((u) => u.id === user.id);
    this.users[userIndex] = user;

    return user;
  }
}
