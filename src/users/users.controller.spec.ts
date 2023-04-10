import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, QueryDto, UpdateUserDto } from './dto';

const testUserLogin = 'Test user 1';
const testUserPassword = 'Test password 1';

// const testUser = {
//   id: '24ba2bbd-8ffc-4f51-b626-a0d13b4846a4',
//   login: 'Adolfo_Bednar',
//   password: 'tugixopiterotakopaza',
//   age: 64,
//   isDeleted: false,
// };

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAutoSuggestUsers: jest.fn().mockResolvedValue([
              { login: testUserLogin, password: testUserPassword, age: 4 },
              { login: 'Test user 2', password: 'Test password 2', age: 3 },
              { login: 'Test user 3', password: 'Test password 3', age: 2 },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                login: testUserLogin,
                password: testUserPassword,
                age: 4,
                id,
              }),
            ),
            create: jest.fn().mockImplementation((user: CreateUserDto) =>
              Promise.resolve({
                id: 'a uuid',
                isDeleted: false,
                ...user,
              }),
            ),
            getUser: jest
              .fn()
              .mockImplementation(({ username, password }) =>
                Promise.resolve({ username, password, age: 4 }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, user: UpdateUserDto) =>
                Promise.resolve({ id, ...user }),
              ),
            remove: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                isDeleted: true,
                login: testUserLogin,
                password: testUserPassword,
                age: 4,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const queryDTO: QueryDto = { loginSubstring: '', limit: 100 };

    it('should return an array of users', async () => {
      await expect(controller.findAll(queryDTO)).resolves.toEqual([
        {
          login: testUserLogin,
          password: testUserPassword,
          age: 4,
        },
        {
          login: 'Test user 2',
          password: 'Test password 2',
          age: 3,
        },
        {
          login: 'Test user 3',
          password: 'Test password 3',
          age: 2,
        },
      ]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDTO: CreateUserDto = {
        login: 'New user 1',
        password: 'New password 1',
        age: 18,
      };
      await expect(controller.create(createUserDTO)).resolves.toEqual({
        id: 'a uuid',
        isDeleted: false,
        ...createUserDTO,
      });
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      await expect(controller.findOne('a uuid')).resolves.toEqual({
        login: testUserLogin,
        password: testUserPassword,
        age: 4,
        id: 'a uuid',
      });
      await expect(controller.findOne('a different uuid')).resolves.toEqual({
        login: testUserLogin,
        password: testUserPassword,
        age: 4,
        id: 'a different uuid',
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDTO: UpdateUserDto = {
        login: testUserLogin,
        password: testUserPassword,
        age: 4,
      };

      await expect(
        controller.update('a uuid that exists', updateUserDTO),
      ).resolves.toEqual({
        id: 'a uuid that exists',
        ...updateUserDTO,
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing user', async () => {
      await expect(controller.remove('a uuid that exists')).resolves.toEqual({
        id: 'a uuid that exists',
        isDeleted: true,
        login: testUserLogin,
        password: testUserPassword,
        age: 4,
      });
    });
  });
});
