import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import { FindParams } from './validations/FindParams';
import { FindUserDto } from './dto/find-user.dto';
import { ObjectID } from 'mongodb';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../authorization/role.decorator';
import { Role } from '../authorization/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const response = await this.userService.register(createUserDto);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }

  @Get('activate')
  async activateUser(@Query() { token }): Promise<any> {
    const response = await this.userService.activate(token);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Get()
  async getUser(@Query() params: FindParams): Promise<any> {
    const serviceRequest = new FindUserDto();
    if (params.id && params.email) {
      return new ServiceResponse('BAD_REQUEST')
        .getJSON()
        .getControllerResponse();
    } else {
      if (params.email) serviceRequest.email = params.email;
      if (params.id) serviceRequest.id = new ObjectID(params.id);
      const response = await this.userService.get(serviceRequest);
      return new ServiceResponse(response.serviceMessage)
        .setBody(response.body)
        .getJSON()
        .getControllerResponse();
    }
  }

  @UseGuards(AuthGuard(['jwtAdmin']))
  @Roles(Role.Admin)
  @Put()
  async putUserAdmin(
    @Query() params: FindParams,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const serviceRequest = new FindUserDto();
    if (params.id && params.email) {
      return new ServiceResponse('BAD_REQUEST')
        .getJSON()
        .getControllerResponse();
    } else {
      if (params.email) serviceRequest.email = params.email;
      if (params.id) serviceRequest.id = new ObjectID(params.id);
      const response = await this.userService.update({ serviceRequest, body });
      return new ServiceResponse(response.serviceMessage)
        .setBody(response.body)
        .getJSON()
        .getControllerResponse();
    }
  }
}
