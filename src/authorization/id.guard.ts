import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ID_KEY } from './id.decorator';
import { Id } from './id.enum';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const idRequired = this.reflector.getAllAndOverride<Id>(ID_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    switch (idRequired) {
      case Id.Email:
        const {
          body: { email },
        } = context.switchToHttp().getRequest();
        const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
          context.switchToHttp().getRequest(),
        );
        const decoded = this.jwtService.decode(jwt);
        const jwtEmail = decoded['email'];
        if (email === jwtEmail) {
          return true;
        }
        return false;
      case undefined:
        return true;
      default:
        return false;
    }
  }
}
