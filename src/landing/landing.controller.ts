import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  ContextType,
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

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}
  @UseGuards(AuthGuard(['jwtAdmin', 'jwtUser']))
  @Roles(Role.University, Role.Admin)
  @Post()
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
    return response;
  }
}
