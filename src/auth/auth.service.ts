import { Inject, Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      email: validateUserDto.email,
    });
    if (!user) return null;
    return await bcrypt
      .compare(validateUserDto.password, user?.password)
      .then((result) => {
        if(!result) return null
        return user
      }).catch(() => {
        return null
      })
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
