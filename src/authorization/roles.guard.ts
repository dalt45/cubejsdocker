import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { UsersService } from '../users/users.service';
import { AdminService } from 'src/admin/admin.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
    private adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    );
    if (!jwt) {
      return false;
    }
    const decoded = this.jwtService.decode(jwt);
    const email = decoded['email'];
    const isAdmin = await this.adminService.userExists(email);
    if (isAdmin && requiredRoles.some((role) => role === 'admin')) {
      return true;
    } else {
      const findUserDto = new FindUserDto();
      findUserDto.email = email;
      const response = await this.usersService.get(findUserDto);
      const responseUser: User = response.body[0];
      return requiredRoles.some(
        (role) => (responseUser && (responseUser.type as string)) === role,
      );
    }
  }
}
