import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import { LandingService } from './landing.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { CreateLandingDto } from './dto/create-landing.dto';
import { IdMatch } from '../authorization/id.decorator';
import { Id } from '../authorization/id.enum';
import { LandingValidation } from './dto/landing-validation.dto';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { User } from 'src/users/user.entity';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}
  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  @IdMatch(Id.University)
  async createLanding(
    @Body() landing: CreateLandingDto,
    @UserInfo() userInfo: User,
  ): Promise<any> {
    const response = await this.landingService.create(landing, userInfo);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.landingService.get(Params);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Put()
  async editLanding(
    @Query() Params: any,
    @Body() landing: LandingValidation,
  ): Promise<any> {
    const response = await this.landingService.edit(Params.id, landing);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }
}
