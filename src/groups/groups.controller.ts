import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto, AddUsersToGroupDto } from './dto';
import { LoggerInterceptor } from '../utils/logger.interceptor';

@Controller('groups')
@UseInterceptors(LoggerInterceptor)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.groupsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.groupsService.remove(id);
  }

  @Post(':id/add-users')
  async addUserGroup(
    @Param('id') id: string,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
  ) {
    return this.groupsService.addUsersToGroup(id, addUsersToGroupDto);
  }
}
