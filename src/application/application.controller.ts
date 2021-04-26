import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { User } from 'src/users/user.entity';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { ApplicationService } from './application.services';
import { EditApplicationValidation } from './documents/validation-application-edit.dto';
import { ApplicationValidation } from './documents/validation-application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(AuthGuard(['jwtUser']))
  @Roles(Role.User)
  @Post()
  async createApplication(
    @Body() application: ApplicationValidation,
    @UserInfo() user: User,
  ): Promise<any> {
    const response = await this.applicationService.create(application, user);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtUser']))
  @Roles(Role.User)
  @Put()
  async editApplication(
    @Body() application: EditApplicationValidation,
    @UserInfo() user: User,
    @Query() params: any,
  ): Promise<any> {
    const response = await this.applicationService.edit(application, params.id);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }
}
