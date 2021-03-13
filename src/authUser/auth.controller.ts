import { Controller, Request, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { AuthGuard } from '@nestjs/passport';
import ControllerResponse from '../utils/serviceResponse/ControllerResponse';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/authorization/role.enum';
import { IdMatch } from 'src/authorization/id.decorator';
import { Id } from 'src/authorization/id.enum';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('localUser'))
  @Post('auth/login')
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }

  @UseGuards(AuthGuard('googleUser'))
  @Get('auth/login/google')
  async googleAuth(@Req() req) {}

  @UseGuards(AuthGuard('googleUser'))
  @Get('auth/google/redirect')
  async googleAuthRedirect(@Req() req) {
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

  @UseGuards(AuthGuard('jwtUser'))
  @Get('profile')
  @IdMatch(Id.Email)
  @Roles(Role.User)
  getProfile(@Request() req) {
    return req.body;
  }
}
