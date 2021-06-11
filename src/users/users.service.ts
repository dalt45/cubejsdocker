import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CountUserDto } from './dto/count-user.dto';
import { User } from './user.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserGoogleDto } from './dto/create-user-google';
import { UserType } from './enums/userType.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { Status } from './enums/status.enum';
import { ConfirmationToken } from '../utils/confirmationToken';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {
  CatchEnum,
  OperationCatcher,
} from 'src/utils/operationCatcher/operationCatcher';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const repeatedUsers = await this.userExists(createUserDto);
    if (repeatedUsers) {
      return ServiceMessages.USER_IS_REPEATED;
    } else {
      await bcrypt.hash(
        createUserDto.password,
        saltRounds,
        async (err, hash) => {
          if (err) {
            return ServiceMessages.ERROR_DEFAULT;
          }
          const user = new User();
          user.email = createUserDto.email;
          user.password = hash;
          user.type = UserType.USER;
          user.university = null;
          user.status = Status.PENDING;
          user.confirmationCode = new ConfirmationToken().get();
          await this.usersRepository.save(user);
          await this.sendConfirmationEmail(user);
        },
      );
      return ServiceMessages.RESPONSE_DEFAULT;
    }
  }

  async sendConfirmationEmail(user: User): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: this.configService.get<string>('SENDGRID_KEY'),
      },
    });
    transporter
      .sendMail({
        from: 'daniel@crecyservices.io',
        to: user.email,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
            <h2>Hello</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${process.env.URL_DOMAIN}/email-confirmation?token=${user.confirmationCode}> Click here</a>
            </div>`,
      })
      .catch((err) => {
        throw new Error('Email service failed: ' + err);
      });
  }

  async activate(token: string): Promise<any> {
    try {
      const user = new OperationCatcher(
        () =>
          this.usersRepository.findOne({
            where: { confirmationCode: { $eq: token } },
          }),
        CatchEnum.find,
      );
      const result = await user.result;
      if (result.shouldReturn) {
        return result.returnValue();
      } else {
        await this.usersRepository.update(await result.returnValue(), {
          status: Status.ACTIVE,
        });
        return { serviceMessage: ServiceMessages.RESPONSE_DEFAULT, body: {} };
      }
    } catch (e) {
      return { serviceMessage: ServiceMessages.ERROR_DEFAULT, body: {} };
    }
  }

  async registerWithGoogle(
    createUserGoogleDto: CreateUserGoogleDto,
  ): Promise<any> {
    const createUserDto = new CreateUserDto();
    createUserDto.email = createUserGoogleDto.email;
    const user = new User();
    user.email = createUserGoogleDto.email;
    user.googleAccessToken = createUserGoogleDto.accessToken;
    user.type = UserType.USER;
    user.status = Status.ACTIVE;
    user.confirmationCode = new ConfirmationToken().get();
    const createdUser: User = await this.usersRepository.save(user);
    return {
      serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
      body: createdUser,
    };
  }

  async userExists(createUserDto: CreateUserDto): Promise<boolean> {
    const response = await this.usersRepository.findAndCount({
      email: createUserDto.email,
    });
    const countUser = new CountUserDto();
    countUser.users = response[0];
    countUser.count = response[1];
    if (countUser.count > 0) {
      return true;
    } else {
      return false;
    }
  }

  async get(findUserDto: FindUserDto): Promise<any> {
    let userResult;
    if (findUserDto.id) {
      const user = new OperationCatcher(
        () =>
          this.usersRepository.findOne({
            where: { _id: { $eq: findUserDto.id } },
          }),
        CatchEnum.find,
      );
      const result = await user.result;
      if (result.shouldReturn) {
        return result.returnValue();
      } else userResult = result.returnValue();
    } else {
      const user = new OperationCatcher(
        () => this.usersRepository.findOne({ email: findUserDto.email }),
        CatchEnum.find,
      );
      const result = await user.result;
      if (result.shouldReturn) {
        return result.returnValue();
      } else userResult = result.returnValue();
    }
    return {
      serviceMessage: ServiceMessages.RESPONSE_BODY,
      body: userResult ? userResult : {},
    };
  }

  async update(request: {
    [key: string]: FindUserDto | UpdateUserDto;
  }): Promise<any> {
    let user;
    if (
      request.serviceRequest instanceof FindUserDto &&
      request.serviceRequest.id
    ) {
      user = await this.usersRepository.findOne({
        where: { _id: { $eq: request.serviceRequest.id } },
      });
    } else {
      user = await this.usersRepository.findOne({
        email: request.serviceRequest.email,
      });
    }
    try {
      await this.usersRepository.update(user, {
        ...request.body,
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: user,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
        body: e,
      };
    }
  }

  async updateLogin(user: any): Promise<boolean> {
    try {
      if (user.id) {
        const userQuery = await this.usersRepository.findOne(user.id);
        await this.usersRepository.update(userQuery, {
          lastLogged: Date.now(),
        });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
