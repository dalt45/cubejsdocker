import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  register(): string {
    return 'User Services';
  }
}
