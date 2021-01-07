import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.authService.validateUser(validateUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}