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

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'alessandra14@ethereal.email',
        pass: 'n8xR54bEaRPBtpWjDa',
      },
    });

    transporter
      .sendMail({
        from: 'alessandra14@ethereal.email',
        to: user.email,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
            <h2>Hello</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${process.env.URL_DOMAIN}/users/activate/?token=${user.confirmationCode}> Click here</a>
            </div>`,
      })
      .catch((err) => {
        throw new Error('Email service failed: ' + err);
      });
  }

  async activate(token: string): Promise<string> {
    try {
      const user = await this.usersRepository.findOne({
        where: { confirmationCode: { $eq: token } },
      });
      if (!user) {
        return ServiceMessages.NOT_FOUND;
      } else {
        await this.usersRepository.update(user, { status: Status.ACTIVE });
        return ServiceMessages.RESPONSE_DEFAULT;
      }
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
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
    let user;
    if (findUserDto.id) {
      user = await await this.usersRepository.findByIds([findUserDto.id], {
        take: 1,
      });
      user = user[0];
    } else {
      user = await this.usersRepository.findOne({ email: findUserDto.email });
    }
    return {
      serviceMessage: ServiceMessages.RESPONSE_BODY,
      body: user ? user : {},
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
      user = await await this.usersRepository.findByIds(
        [request.serviceRequest.id],
        {
          take: 1,
        },
      );
      user = user[0];
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
}
