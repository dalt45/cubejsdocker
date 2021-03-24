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
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { Landing } from './landing.entity';
import { LandingService } from './landing.service';
import { LandingValidation } from './dto/landing-validation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { CreateLandingDto } from './dto/create-landing.dto';
import { IdMatch } from '../authorization/id.decorator';
import { Id } from '../authorization/id.enum';
import { ObjectId } from 'mongodb';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}
  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
  @IdMatch(Id.University)
  async createLanding(@Body() landing: CreateLandingDto): Promise<any> {
    const response = await this.landingService.create(landing);
    const serviceResponse = new ServiceResponse(response);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(errorResponse);
      controllerResponse.httpError();
    }
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Get()
  async getLanding(@Query() Params: any): Promise<any> {
    const response = await this.landingService.get(Params);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    const controllerResponse = new ControllerResponse(successResponse);
    return controllerResponse.httpSuccess();
  }

  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Put()
  async editLanding(
    @Query() Params: any,
    @Body() landing: LandingValidation,
  ): Promise<any> {
    const response = await this.landingService.edit(Params.id, landing);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    const controllerResponse = new ControllerResponse(successResponse);
    return controllerResponse.httpSuccess();
  }
}
