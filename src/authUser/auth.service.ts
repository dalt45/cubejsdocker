import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { UsersService } from '../users/users.service';
import { CreateUserGoogleDto } from 'src/users/dto/create-user-google';
const bcrypt = require('bcrypt');

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
    const payload = { username: user.username, sub: user.userId };
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
    console.log(user)
    if (!user) {
      const createUserDto = new CreateUserGoogleDto();
      createUserDto.email = req.user.email;
      createUserDto.accessToken = req.user.accessToken;
      const response = await this.userService.registerWithGoogle(createUserDto);
      if (response === ServiceMessages.RESPONSE_DEFAULT) {
        const payload = {
          username: createUserDto.email,
        };
        return {
          serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
          body: { access_token: this.jwtService.sign(payload) },
        };
      }
    } else {
      const payload = {
        username: user.email,
      };
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: { access_token: this.jwtService.sign(payload) },
      };
    }
  }
}
