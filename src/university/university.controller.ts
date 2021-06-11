import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { UniversityService } from './university.service';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { User } from '../users/user.entity';
import { UniversityValidation } from './dto/university-validation.dto';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  async createUniversity(
    @UserInfo() userinfo: User,
    @Body() university: UniversityValidation,
  ): Promise<any> {
    const response = await this.universityService.create(university, userinfo);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Get()
  async getUniversity(
    @UserInfo() userinfo: User,
    @Query() Params: any,
  ): Promise<any> {
    const response = await this.universityService.get(Params, userinfo);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Put()
  async editLanding(
    @UserInfo() userInfo: User,
    @Query() params: any,
    @Body() university: UniversityValidation,
  ): Promise<any> {
    const response = await this.universityService.edit(
      university,
      params,
      userInfo,
    );
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

  @Delete()
  async deleteImage(@Query() Params: any): Promise<any> {
    const response = await this.universityService.deleteImage(
      Params.id,
      Params.url,
    );
    return new ServiceResponse(response.serviceMessage)
      .getJSON()
      .getControllerResponse();
  }
}
