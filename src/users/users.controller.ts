import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import { FindParams } from './validations/FindParams';
import { FindUserDto } from './dto/find-user.dto';
import { ObjectID } from 'mongodb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const response = await this.userService.register(createUserDto);
    const serviceResponse = new ServiceResponse(response);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
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

  @Get()
  async getUser(@Query() params: FindParams): Promise<any> {
    const serviceRequest = new FindUserDto();
    if (params.id && params.email) {
      const serviceResponse = new ServiceResponse('BAD_REQUEST');
      const errorResponse = serviceResponse.getResponse();
      throw new HttpException(
        {
          status: errorResponse.statusCode,
          error: errorResponse.message,
        },
        errorResponse.statusCode,
      );
    } else {
      serviceRequest.email = params.email;
      serviceRequest.id = new ObjectID(params.id);
      const response = await this.userService.get(serviceRequest);
      const serviceResponse = new ServiceResponse(response.serviceMessage);
      serviceResponse.serviceResponse.hasBody = true;
      serviceResponse.serviceResponse.body = response.body;
      const successResponse = serviceResponse.getResponse();
      return successResponse;
    }
  }
}
