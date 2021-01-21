import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.adminRepository.findOne({
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
}
