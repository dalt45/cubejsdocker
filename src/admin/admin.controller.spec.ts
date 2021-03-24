import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FindAdminDto } from './dto/find-admin.dto';
import { ObjectID } from 'mongodb';

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UserController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let repositoryMock: MockType<Repository<Admin>>;
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
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    // userService = await moduleRef.resolve(UsersService);
    adminController = moduleRef.get<AdminController>(AdminController);
    repositoryMock = moduleRef.get(getRepositoryToken(Admin));
    adminService = moduleRef.get(AdminService);
  });

  describe('registerUser', () => {
    it('should accept a valid email and password', async () => {
      const adminTest = {
        email: 'a@a.com',
        password: '12345',
      };
      expect(await adminController.registerUser(adminTest)).toMatchObject({
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findAndCount).toHaveBeenCalledWith({
        email: adminTest.email,
      });
    });
  });

  describe('registerExistingUser', () => {
    it('should reject a existing user', async () => {
      const adminTest = {
        email: 'a@a.com',
        password: '12345',
      };
      serviceResponse = new ServiceResponse('USER_IS_REPEATED');
      controllerResponse = new ControllerResponse(
        serviceResponse.getResponse(),
      );
      finalResponse = controllerResponse.mockError();
      adminService.userExists = jest.fn().mockReturnValueOnce(true);
      try {
        expect(await adminController.registerUser(adminTest)).toThrow();
        expect(adminService.userExists).toHaveBeenCalledWith({
          email: adminTest.email,
          password: adminTest.password,
        });
        expect(adminService.userExists).toReturnWith(true);
        expect(await adminService.register(adminTest)).toEqual(
          'USER_IS_REPEATED',
        );
      } catch (e) {
        expect(e.response).toEqual(finalResponse);
      }
    });
  });

  describe('getAnUserWithId', () => {
    it('should return the user by using the id', async () => {
      const testQuery = { email: 'b@b.com', id: undefined };
      const mockedAdmin = new Admin();
      mockedAdmin.email = testQuery.email;
      mockedAdmin.id = new ObjectID();
      repositoryMock.findOne = jest.fn().mockReturnValueOnce(mockedAdmin);
      const findAdminReturn = new Admin();
      findAdminReturn.email = testQuery.email;
      findAdminReturn.id = mockedAdmin.id;
      expect(await adminController.getAdmin(testQuery)).toEqual({
        body: findAdminReturn,
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findOne).toReturnWith({
        email: testQuery.email,
        id: findAdminReturn.id,
      });
    });
  });
  describe('getAnUserWithEmail', () => {
    it('should return the user by using the email', async () => {
      const mockedAdmin = new Admin();
      mockedAdmin.email = 'b@b.com';
      mockedAdmin.id = new ObjectID();
      const testQuery = {
        email: undefined,
        id: (mockedAdmin.id as unknown) as string,
      };
      repositoryMock.findByIds = jest.fn().mockReturnValueOnce([mockedAdmin]);
      const findAdminReturn = new FindAdminDto();
      findAdminReturn.email = mockedAdmin.email;
      findAdminReturn.id = mockedAdmin.id;
      expect(await adminController.getAdmin(testQuery)).toEqual({
        body: findAdminReturn,
        message: 'Success',
        statusCode: 200,
      });
      expect(repositoryMock.findByIds).toReturnWith([
        { email: mockedAdmin.email, id: findAdminReturn.id },
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
        expect(await adminController.getAdmin(testQuery)).toThrowError();
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
