import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CountUserDto } from './dto/count-user.dto';
import { User } from './user.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { FindUserDto } from './dto/find-user.dto';
const bcrypt = require('bcrypt');

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
          await this.usersRepository.save(user);
        },
      );
      return ServiceMessages.RESPONSE_DEFAULT;
    }
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
    let users;
    if (findUserDto.id) {
      console.log(findUserDto)
      users = await this.usersRepository.findByIds([findUserDto.id]);
      console.log(users);
    } else {
      users = await this.usersRepository.find(findUserDto);
    }
    if (users) {
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: users,
      };
    } else {
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: [],
      };
    }
  }
}
