import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const jwtService = new JwtService({});
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(
      ctx.switchToHttp().getRequest(),
    );
    const decoded = jwtService.decode(jwt);
    return decoded;
  },
);
