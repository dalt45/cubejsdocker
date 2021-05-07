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
import { CampusService } from './campus.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { IdMatch } from '../authorization/id.decorator';
import { Id } from '../authorization/id.enum';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { User } from 'src/users/user.entity';
import { CreateCampusDto } from './dto/create-campus-validation.dto';
import { CampusValidation } from './dto/campus-validation.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}
  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  @IdMatch(Id.University)
  async createLanding(
    @Body() campus: CreateCampusDto,
    @UserInfo() userInfo: User,
  ): Promise<any> {
    const response = await this.campusService.create(campus, userInfo);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.campusService.get(Params);
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
    @Body() campus: CampusValidation,
  ): Promise<any> {
    const response = await this.campusService.edit(Params.id, campus);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Delete()
  async deleteImage(@Query() Params: any): Promise<any> {
    const response = await this.campusService.deleteImage(
      Params.id,
      Params.url,
    );
    return new ServiceResponse(response.serviceMessage)
      .getJSON()
      .getControllerResponse();
  }
}
