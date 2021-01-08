import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email', passwordField:'password'});
  }

  async validate(username: string, password: string): Promise<any> {
    const userToValidate: ValidateUserDto = {
      email: username,
      password: password
    }
    const user = await this.authService.validateUser(userToValidate);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}