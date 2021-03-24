import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { ObjectID } from 'mongodb';

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UsersService;
  let repositoryMock: MockType<Repository<User>>;
  let serviceResponse: ServiceResponse;
  let controllerResponse: ControllerResponse;
  let finalResponse: any;

  beforeEach(async () => {
    const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
      () => ({
        findOne: jest.fn((entity) => entity),
        findAndCount: jest.fn((entity) => entity),
        save: jest.fn((entity) => entity),
        find: jest.fn((entity) => entity),
      }),
    );
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    // userService = await moduleRef.resolve(UsersService);
    userController = moduleRef.get<UserController>(UserController);
    repositoryMock = moduleRef.get(getRepositoryToken(User));
    userService = moduleRef.get(UsersService);
  });

  describe('registerUser', () => {
    it('should accept a valid email and password', async () => {
      const userTest = {
        email: 'a@a.com',
        password: '12345',
      };
      expect(await userController.registerUser(userTest)).toMatchObject({
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findAndCount).toHaveBeenCalledWith({
        email: userTest.email,
      });
    });
  });

  describe('registerExistingUser', () => {
    it('should reject a existing user', async () => {
      const userTest = {
        email: 'a@a.com',
        password: '12345',
      };
      const testResponse = new ServiceResponse('USER_IS_REPEATED')
        .getJSON()
        .mockError();
      userService.userExists = jest.fn().mockReturnValueOnce(true);
      try {
        expect(await userController.registerUser(userTest)).toThrow();
        expect(userService.userExists).toHaveBeenCalledWith({
          email: userTest.email,
          password: userTest.password,
        });
        expect(userService.userExists).toReturnWith(true);
        expect(await userService.register(userTest)).toEqual(
          'USER_IS_REPEATED',
        );
      } catch (e) {
        expect(e.response).toEqual(testResponse);
      }
    });
  });

  describe('getAnUserWithId', () => {
    it('should return the user by using the id', async () => {
      const testQuery = { email: 'b@b.com', id: undefined };
      const mockedUser = new User();
      mockedUser.email = testQuery.email;
      mockedUser.id = new ObjectID();
      repositoryMock.findOne = jest.fn().mockReturnValueOnce(mockedUser);
      const findUserReturn = new FindUserDto();
      findUserReturn.email = testQuery.email;
      findUserReturn.id = mockedUser.id;
      expect(await userController.getUser(testQuery)).toEqual({
        body: findUserReturn,
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findOne).toReturnWith({
        email: testQuery.email,
        id: findUserReturn.id,
      });
    });
  });
  describe('getAnUserWithEmail', () => {
    it('should return the user by using the email', async () => {
      const mockedUser = new User();
      mockedUser.email = 'b@b.com';
      mockedUser.id = new ObjectID();
      const testQuery = {
        email: undefined,
        id: (mockedUser.id as unknown) as string,
      };
      repositoryMock.findByIds = jest.fn().mockReturnValueOnce([mockedUser]);
      const findUserReturn = new FindUserDto();
      findUserReturn.email = mockedUser.email;
      findUserReturn.id = mockedUser.id;
      expect(await userController.getUser(testQuery)).toEqual({
        body: findUserReturn,
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findByIds).toReturnWith([
        {
          email: mockedUser.email,
          id: findUserReturn.id,
        },
      ]);
    });
  });

  describe('getAnUserWithEmailAndId', () => {
    it('should return a bad request if query is made with both', async () => {
      const testObjectId = new ObjectID();
      const testQuery = {
        email: 'a@a.com',
        id: (testObjectId as unknown) as string,
      };
      try {
        expect(await userController.getUser(testQuery)).toThrowError();
      } catch (e) {
        serviceResponse = new ServiceResponse('BAD_REQUEST');
        controllerResponse = new ControllerResponse(
          serviceResponse.getResponse(),
        );
        finalResponse = controllerResponse.mockError();
        expect(e.response).toEqual(finalResponse);
      }
    });
  });
});
