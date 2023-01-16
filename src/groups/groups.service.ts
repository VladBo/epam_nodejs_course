import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, AddUsersToGroupDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from './entities';
import { User } from '../users/entities';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(group: CreateGroupDto) {
    return await this.groupsRepository.save(group);
  }

  async findAll() {
    return await this.groupsRepository.find({ relations: ['users'] });
  }

  async findOne(id: string) {
    return await this.groupsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async update(id: string, group: UpdateGroupDto) {
    await this.groupsRepository.update(id, group);
    const updatedGroup = await this.groupsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (updatedGroup) {
      return updatedGroup;
    }
    throw new NotFoundException(id);
  }

  async remove(id: string) {
    const hardDelete = await this.groupsRepository.delete(id);
    if (!hardDelete) {
      throw new NotFoundException(id);
    }
  }

  async addUsersToGroup(id: string, addUsersToGroupDto: AddUsersToGroupDto) {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    const userIds = addUsersToGroupDto.users.map((user) => user.id);
    const users = await this.usersRepository.findBy({
      id: In(userIds),
    });
    if (!group || !users) {
      throw new NotFoundException(id);
    }
    group.users.push(...users);
    return await this.groupsRepository.save(group);
  }
}
