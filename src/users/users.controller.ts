import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const response = await this.userService.register(createUserDto);
    console.log(response);
    const serviceResponse = new ServiceResponse(response);
    console.log(serviceResponse);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      console.log(errorResponse, "error");
      throw new HttpException(
        {
          status: errorResponse.statusCode,
          error: errorResponse.message,
        },
        errorResponse.statusCode,
      );
    } else {
      const sucessResponse = serviceResponse.getResponse();
      return sucessResponse;
    }
  }
}
