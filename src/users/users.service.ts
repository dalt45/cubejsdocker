import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CountUserDto } from './dto/count-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const repeatedUsers = await this.checkForRepeatedUser(createUserDto);
    if (repeatedUsers.count > 0) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    console.log(user);
    await this.save(user);
  }

  async checkForRepeatedUser(
    createUserDto: CreateUserDto,
  ): Promise<CountUserDto> {
    const response = await this.findAndCount({
      email: createUserDto.email,
    });
    console.log(response);
    const countUser = new CountUserDto();
    countUser.users = response[0];
    countUser.count = response[1];
    console.log(countUser);
    return countUser;
  }

  async findAndCount(findUserDto: FindUserDto): Promise<[User[], number]> {
    const users = await this.usersRepository.findAndCount({
      email: findUserDto.email,
    });
    return users;
  }

  async findOne(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(createUserDto);
    return user;
  }

  async find(createUserDto: CreateUserDto): Promise<User[]> {
    const users = await this.usersRepository.find(createUserDto);
    return users;
  }

  async save(user: User): Promise<any> {
    await this.usersRepository.save(user);
  }

  test(): string {
    return 'User Services';
  }
}
