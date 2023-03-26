import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from './dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async getAutoSuggestUsers(query: QueryDto) {
    const options: FindManyOptions<User> = {
      take: query.limit,
      order: { login: 'ASC' },
      where: {},
    };

    if (query.loginSubstring) {
      options.where['login'] = Like(`%${query.loginSubstring}%`);
    }
    return this.usersRepository.find(options);
  }

  async findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async getUser({ username, password }) {
    return this.usersRepository.findOneBy({
      login: username,
      password,
    });
  }

  async update(id: string, user: UpdateUserDto) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (updatedUser) {
      return updatedUser;
    }
    throw new NotFoundException(id);
  }

  async remove(id: string) {
    const softDelete = await this.usersRepository.update(id, {
      isDeleted: true,
    });
    if (!softDelete) {
      throw new NotFoundException(id);
    }
  }
}
