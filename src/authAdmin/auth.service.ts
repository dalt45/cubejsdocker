import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import * as bcrypt from 'bcrypt';
import { CreateAdminGoogleDto } from 'src/admin/dto/create-admin-google';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private readonly adminService: AdminService,
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

  async googleCallback(req) {
    if (!req.user) {
      return {
        serviceMessage: ServiceMessages.UNAUTHORIZED,
      };
    }
    const user = await this.adminRepository.findOne({
      email: req.user.email,
    });
    if (!user) {
      const createAdminDto = new CreateAdminGoogleDto();
      createAdminDto.email = req.user.email;
      createAdminDto.accessToken = req.user.accessToken;
      const response = await this.adminService.registerWithGoogle(
        createAdminDto,
      );
      if (response === ServiceMessages.RESPONSE_DEFAULT) {
        const payload = {
          username: createAdminDto.email,
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
