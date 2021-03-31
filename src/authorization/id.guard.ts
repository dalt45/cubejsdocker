import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ID_KEY } from './id.decorator';
import { Id } from './id.enum';
import { ObjectId } from 'mongodb';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const idRequired = this.reflector.getAllAndOverride<Id>(ID_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!idRequired) {
      return true;
    }
    let jwtEmail: string;
    let jwtUniversity: ObjectId;
    const {
      body: { email, id: university },
    } = context.switchToHttp().getRequest();
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    );
    const decoded = this.jwtService.decode(jwt);

    if (
      typeof decoded === 'object' &&
      decoded.id &&
      this.adminService.userExists(decoded.id)
    ) {
      return true;
    }
    switch (idRequired) {
      case Id.Email:
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
