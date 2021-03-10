import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import ServiceResponse from '../utils/serviceResponse/ServiceResponse';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'localUser') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<any> {
    const userToValidate: ValidateUserDto = {
      email: username,
      password: password,
    };
    const response = await this.authService.validateUser(userToValidate);
    const serviceResponse = new ServiceResponse(response.serviceMessage);
    if (serviceResponse.isError()) {
      const errorResponse = serviceResponse.getResponse();
      throw new HttpException(
        {
          status: errorResponse.statusCode,
          error: errorResponse.message,
        },
        errorResponse.statusCode,
      );
    }
    serviceResponse.serviceResponse.hasBody = true;
    serviceResponse.serviceResponse.body = response.body;
    const successResponse = serviceResponse.getResponse();
    return successResponse;
  }
}
