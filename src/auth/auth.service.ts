import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        ){}

    async validateUser(validateUserDto: ValidateUserDto): Promise <any> {
        const user = await this.usersRepository.findOne(validateUserDto.email)
        let hashResult: boolean;
        if(user){
        await bcrypt.compare(validateUserDto.password, user?.password, (err,result) => {
            if (err) return null
            hashResult = result
        })
        if(hashResult){
            return user
        }
    } else return null
    }
}
