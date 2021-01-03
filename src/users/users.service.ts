import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CountUserDto } from './dto/count-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ResponseUserDto } from './dto/user-response.dto';
import { User } from './user.entity';
const bcrypt = require('bcrypt');

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const response = new ResponseUserDto;
    const repeatedUsers = await this.userExists(createUserDto);
    if (repeatedUsers) {
      response.message = "User already exists";
      response.statusCode = HttpStatus.FORBIDDEN
      return response
    }
    bcrypt.hash(createUserDto.password, saltRounds, async (err, hash) => {
      console.log(HttpStatus);
      if(err){
          response.message = "Error creating user";
          response.statusCode = HttpStatus.FORBIDDEN
          return response;
      }
      const user = new User();
      user.email = createUserDto.email;
      user.password = hash;
      console.log(user);
      await this.usersRepository.save(user);
      response.message = "User created";
      response.statusCode = HttpStatus.CREATED
      return response
    });
  }

  async userExists(
    createUserDto: CreateUserDto,
  ): Promise<Boolean> {
    const response = await this.usersRepository.findAndCount({
      email: createUserDto.email,
    });
    console.log(response);
    const countUser = new CountUserDto();
    countUser.users = response[0];
    countUser.count = response[1];
    if( countUser.count > 0){
      return true
    }else{
      return false
    }
  }

}
