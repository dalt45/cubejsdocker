import { Admin } from '../admin.entity';

export class CountAdminDto {
  users: Admin[];
  count: number;
}
