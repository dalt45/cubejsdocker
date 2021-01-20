import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserGoogleAuthGuard extends AuthGuard('googleAdmin') {}
