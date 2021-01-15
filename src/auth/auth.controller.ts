import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
