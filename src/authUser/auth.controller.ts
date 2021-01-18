import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { UserLocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserJwtAuthGuard } from './jwt-auth.guard';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwtUser'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
