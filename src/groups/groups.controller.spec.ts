import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { Permission } from './enums';

const testGroupId = 'a group uuid';
const testGroupName = 'Test group 1';
const testGroupPermissions = ['READ', 'WRITE'] as Permission[];
const testGroupUsers = [
  {
    id: 'a uuid',
    login: 'test user 1',
    password: 'test user password 1',
    age: 5,
    isDeleted: false,
  },
];

describe('Groups Controller', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {
          provide: GroupsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: testGroupId,
                name: testGroupName,
                permissions: testGroupPermissions,
                users: testGroupUsers,
              },
              {
                id: 'a group uuid 2',
                name: 'test group 2',
                permissions: [],
                users: [],
              },
              {
                id: 'a group uuid 3',
                name: 'test group 3',
                permissions: [],
                users: [],
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                name: testGroupName,
                permissions: testGroupPermissions,
                users: testGroupUsers,
              }),
            ),
            create: jest.fn().mockImplementation((group: CreateGroupDto) =>
              Promise.resolve({
                id: 'a uuid',
                ...group,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: string, group: UpdateGroupDto) =>
                Promise.resolve({ id, ...group }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          id: testGroupId,
          name: testGroupName,
          permissions: testGroupPermissions,
          users: testGroupUsers,
        },
        {
          id: 'a group uuid 2',
          name: 'test group 2',
          permissions: [],
          users: [],
        },
        {
          id: 'a group uuid 3',
          name: 'test group 3',
          permissions: [],
          users: [],
        },
      ]);
    });
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const createGroupDTO: CreateGroupDto = {
        name: 'test group 1',
        permissions: [],
        users: [],
      };
      await expect(controller.create(createGroupDTO)).resolves.toEqual({
        id: 'a uuid',
        ...createGroupDTO,
      });
    });
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      await expect(controller.findOne('a uuid')).resolves.toEqual({
        id: 'a uuid',
        name: testGroupName,
        permissions: testGroupPermissions,
        users: testGroupUsers,
      });
      await expect(controller.findOne('a different uuid')).resolves.toEqual({
        id: 'a different uuid',
        name: testGroupName,
        permissions: testGroupPermissions,
        users: testGroupUsers,
      });
    });
  });

  describe('update', () => {
    it('should update a group', async () => {
      const updateGroupDTO: UpdateGroupDto = {
        name: testGroupName,
        permissions: testGroupPermissions,
      };

      await expect(
        controller.update('a uuid that exists', updateGroupDTO),
      ).resolves.toEqual({
        id: 'a uuid that exists',
        ...updateGroupDTO,
      });
    });
  });

  describe('delete', () => {
    it('should call deleteNote method with expected param', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      const groupUuid = 'a group uuid that exists';
      service.remove(groupUuid);
      expect(deleteSpy).toHaveBeenCalledWith(groupUuid);
    });
  });
});
