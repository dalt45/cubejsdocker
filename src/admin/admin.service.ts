import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CountAdminDto } from './dto/count-admin.dto';
import { Admin } from './admin.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { FindAdminDto } from './dto/find-admin.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminGoogleDto } from './dto/create-admin-google';

const saltRounds = 10;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async register(createAdminDto: CreateAdminDto): Promise<string> {
    const repeatedAdmins = await this.userExists(createAdminDto.email);
    if (repeatedAdmins) {
      return ServiceMessages.USER_IS_REPEATED;
    } else {
      await bcrypt.hash(
        createAdminDto.password,
        saltRounds,
        async (err, hash) => {
          if (err) {
            return ServiceMessages.ERROR_DEFAULT;
          }
          const admin = new Admin();
          admin.email = createAdminDto.email;
          admin.password = hash;
          await this.adminRepository.save(admin);
        },
      );
      return ServiceMessages.RESPONSE_DEFAULT;
    }
  }

  async userExists(email: string): Promise<boolean> {
    const countUser = await this.adminRepository.findAndCount({
      email,
    });
    const countAdmin = new CountAdminDto();
    countAdmin.users = countUser[0];
    countAdmin.count = countUser[1];
    if (countAdmin.count > 0) {
      return true;
    } else {
      return false;
    }
  }

  async get(findAdminDto: FindAdminDto): Promise<any> {
    let admin;
    if (findAdminDto.id) {
      admin = await this.adminRepository.findByIds([findAdminDto.id], {
        take: 1,
      });
      admin = admin[0];
    } else {
      admin = await this.adminRepository.findOne({ email: findAdminDto.email });
    }
    if (admin) {
      const responseAdmin = new Admin();
      responseAdmin.email = admin.email;
      responseAdmin.id = admin.id;
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: responseAdmin,
      };
    } else {
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: {},
      };
    }
  }

  async registerWithGoogle(
    createAdminGoogleDto: CreateAdminGoogleDto,
  ): Promise<string> {
    const createAdminDto = new CreateAdminDto();
    createAdminDto.email = createAdminGoogleDto.email;
    const user = new Admin();
    user.email = createAdminGoogleDto.email;
    user.googleAccessToken = createAdminGoogleDto.accessToken;
    await this.adminRepository.save(user);
    return ServiceMessages.RESPONSE_DEFAULT;
  }
}
