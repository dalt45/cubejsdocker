import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserGoogleDto } from 'src/users/dto/create-user-google';
import { Status } from 'src/users/enums/status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      email: validateUserDto.email,
    });
    if (!user)
      return {
        serviceMessage: ServiceMessages.UNAUTHORIZED,
        body: {},
      };
    return await bcrypt
      .compare(validateUserDto.password, user?.password)
      .then((result) => {
        if (!result) {
          return {
            serviceMessage: ServiceMessages.UNAUTHORIZED,
            body: {},
          };
        }
        return {
          serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
          body: user,
        };
      })
      .catch(() => {
        return {
          serviceMessage: ServiceMessages.ERROR_DEFAULT,
          body: {},
        };
      });
  }

  async login(user: any) {
    const payload = {
      email: user.body.email,
      id: user.body.id,
      type: user.body.type,
      university: user.body.university,
    };
    if (user.body.status === Status.PENDING) {
      return {
        serviceMessage: ServiceMessages.ACTIVATION_PENDING,
        body: {},
      };
    }
    this.userService.updateLogin({ id: user.body.id });
    return {
      serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
      body: { access_token: this.jwtService.sign(payload) },
    };
  }

  async googleCallback(req) {
    if (!req.user) {
      return {
        serviceMessage: ServiceMessages.UNAUTHORIZED,
      };
    }
    const user = await this.usersRepository.findOne({
      email: req.user.email,
    });
    if (!user) {
      const createUserDto = new CreateUserGoogleDto();
      createUserDto.email = req.user.email;
      createUserDto.accessToken = req.user.accessToken;
      const response = await this.userService.registerWithGoogle(createUserDto);
      if (response.serviceMessage === ServiceMessages.RESPONSE_DEFAULT) {
        const payload = {
          email: createUserDto.email,
          id: response.body.id,
        };
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: { access_token: this.jwtService.sign(payload) },
        };
      }
    } else {
      this.userService.updateLogin({ id: user.id });
      const payload = {
        email: user.email,
        type: user.type,
      };
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: { access_token: this.jwtService.sign(payload) },
      };
    }
  }
}
