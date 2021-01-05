import { Controller, Get, Post, Body } from '@nestjs/common';
import {HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const response = await this.userService.register(createUserDto);
    if(response.statusCode !== HttpStatus.CREATED){
      throw new HttpException({
        status: response.statusCode,
        error: response.message,
      }, response.statusCode);
    }
    else return response
  }

}
