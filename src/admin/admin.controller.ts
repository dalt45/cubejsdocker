import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { FindParams } from './validations/FindParams';
import { FindAdminDto } from './dto/find-admin.dto';
import { ObjectID } from 'mongodb';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async registerUser(@Body() createAdminDto: CreateAdminDto): Promise<any> {
    const response = await this.adminService.register(createAdminDto);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }

  @Get()
  async getAdmin(@Query() params: FindParams): Promise<any> {
    const serviceRequest = new FindAdminDto();
    if (params.id && params.email) {
      return new ServiceResponse('BAD_REQUEST')
        .getJSON()
        .getControllerResponse();
    } else {
      if (params.email) serviceRequest.email = params.email;
      if (params.id) serviceRequest.id = new ObjectID(params.id);
      const response = await this.adminService.get(serviceRequest);
      return new ServiceResponse(response.serviceMessage)
        .setBody(response.body)
        .getJSON()
        .getControllerResponse();
    }
  }
}
