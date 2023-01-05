import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryDto } from './dto/query.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async getAutoSuggestUsers(query: QueryDto) {
    let users = await this.usersRepository.findAll();
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
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
