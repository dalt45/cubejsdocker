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
    if(response.statusCode !== "201"){
      const statusCode: number = (response.statusCode as unknown) as number;
      throw new HttpException({
        status: response.statusCode,
        error: response.message,
      }, statusCode);
    }
    else return response
  }

}
