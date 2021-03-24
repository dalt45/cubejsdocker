import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ID_KEY } from './id.decorator';
import { Id } from './id.enum';
import { ObjectId } from 'mongodb';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const idRequired = this.reflector.getAllAndOverride<Id>(ID_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    let jwtEmail: string;
    let jwtUniversity: ObjectId;
    let jwt: string;
    let decoded: { [key: string]: any } | string;
    switch (idRequired) {
      case Id.Email:
        const {
          body: { email },
        } = context.switchToHttp().getRequest();
        jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
          context.switchToHttp().getRequest(),
        );
        decoded = this.jwtService.decode(jwt);
        if (typeof decoded === 'object') {
          jwtEmail = decoded.email;
        } else {
          jwtEmail = null;
        }
        if (email === jwtEmail) {
          return true;
        }
        return false;
      case Id.University:
        const {
          body: { id: university },
        } = context.switchToHttp().getRequest();
        jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
          context.switchToHttp().getRequest(),
        );
        decoded = this.jwtService.decode(jwt);
        if (typeof decoded === 'object') {
          jwtUniversity = decoded.university;
        } else {
          jwtUniversity = null;
        }
        if (university === jwtUniversity) {
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
