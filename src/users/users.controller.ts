import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
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
      const controllerResponse = new ControllerResponse(errorResponse);
      controllerResponse.httpError();
    } else {
      const sucessResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(sucessResponse);
      return controllerResponse.httpSuccess();
    }
  }

  @Get()
  async getUser(@Query() params: FindParams): Promise<any> {
    const serviceRequest = new FindUserDto();
    if (params.id && params.email) {
      const serviceResponse = new ServiceResponse('BAD_REQUEST');
      const errorResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(errorResponse);
      controllerResponse.httpError();
    } else {
      if (params.email) serviceRequest.email = params.email;
      if (params.id) serviceRequest.id = new ObjectID(params.id);
      const response = await this.userService.get(serviceRequest);
      const serviceResponse = new ServiceResponse(response.serviceMessage);
      serviceResponse.serviceResponse.hasBody = true;
      serviceResponse.serviceResponse.body = response.body;
      const successResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(successResponse);
      return controllerResponse.httpSuccess();
    }
  }
}
