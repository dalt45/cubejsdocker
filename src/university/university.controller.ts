import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  async createUniversity(@Body() university: any): Promise<any> {
    const response = await this.universityService.create(university);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(errorResponse);
      controllerResponse.httpError();
    }
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    const controllerResponse = new ControllerResponse(successResponse);
    return controllerResponse.httpSuccess();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.universityService.get(Params);
    return response;
  }
}
