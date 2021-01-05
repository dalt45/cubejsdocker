import { User } from '../user.entity';

export class CountUserDto {
  users: User[];
  count: number;
}
