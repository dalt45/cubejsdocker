import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { User } from 'src/users/user.entity';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { ApplicationService } from './application.services';
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
}
