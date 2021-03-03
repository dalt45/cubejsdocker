import { Controller, Post, Body } from '@nestjs/common';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { Landing } from './landing.entity'
import { LandingService } from './landing.service'

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post('create')
  async registerUser(@Body() landing: Landing): Promise<any> {
    const response = await this.landingService.create(landing)
    const serviceResponse = new ServiceResponse(response);
    if(serviceResponse.isError()){
        const errorResponse = serviceResponse.getResponse();
        const controllerResponse = new ControllerResponse(errorResponse);
        controllerResponse.httpError();
    }
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }
  }