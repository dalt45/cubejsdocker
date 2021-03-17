import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthAdminGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthAdminGuard } from './jwt-auth.guard';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { AuthGuard } from '@nestjs/passport';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('localAdmin'))
  @Post('authAdmin/login')
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }

  @UseGuards(AuthGuard('googleAdmin'))
  @Get('authAdmin/login/google')
  async googleAuth(@Request() req) {
    return req;
  }

  @UseGuards(AuthGuard('googleAdmin'))
  @Get('authAdmin/google/redirect')
  async googleAuthRedirect(@Request() req) {
    const response = await this.authService.googleCallback(req);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(errorResponse);
      controllerResponse.httpError();
    } else {
      const successResponse = serviceResponse.getResponse();
      const controllerResponse = new ControllerResponse(successResponse);
      return controllerResponse.httpSuccess();
    }
  }

  @UseGuards(AuthGuard('jwtAdmin'))
  @Get('admin/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
