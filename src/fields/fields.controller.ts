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
import { FieldService } from './fields.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { IdMatch } from '../authorization/id.decorator';
import { Id } from '../authorization/id.enum';
import { UserInfo } from 'src/utils/serviceResponse/user-info.decorator';
import { User } from 'src/users/user.entity';
import { CreateFieldDto } from './dto/create-field-validation.dto';
import { FieldValidation } from './dto/field-validation.dto';

@Controller('fields')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}
  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  @IdMatch(Id.University)
  async createLanding(
    @Body() field: CreateFieldDto,
    @UserInfo() userInfo: User,
  ): Promise<any> {
    const response = await this.fieldService.create(field, userInfo);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.fieldService.get(Params);
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
    @Body() field: FieldValidation,
  ): Promise<any> {
    const response = await this.fieldService.edit(Params.id, field);
    return new ServiceResponse(response).getJSON().getControllerResponse();
  }
}
