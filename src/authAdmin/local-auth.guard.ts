import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthAdminGuard extends AuthGuard('localAdmin') {}
