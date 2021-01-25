import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ID_KEY } from './id.decorator';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const idRequired = this.reflector.getAllAndOverride<boolean>(ID_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!idRequired) {
      return true;
    }
    const {
      body: { email },
    } = context.switchToHttp().getRequest();
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    );
    const decoded = this.jwtService.decode(jwt);
    const jwtEmail = decoded['email'];
    console.log(email, jwtEmail);
    if (email === jwtEmail) {
      return true;
    }
  }
}
