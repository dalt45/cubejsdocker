import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  ContextType,
  SetMetadata,
  Req,
} from '@nestjs/common';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { UniversityService } from './university.service';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { User } from '../users/user.entity';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  async createUniversity(
    @UserInfo() userinfo: User,
    @Body() university: any,
  ): Promise<any> {
    const response = await this.universityService.create(university, userinfo);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      const controllerErrorResponse = new ControllerResponse(errorResponse);
      controllerErrorResponse.httpError();
    }
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    const controllerSuccessResponse = new ControllerResponse(successResponse);
    return controllerSuccessResponse.httpSuccess();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.universityService.get(Params);
    return response;
  }
}
