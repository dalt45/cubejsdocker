import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from './userStatus.enum';
import { ApplicationStatus } from './applicationStatus.enum';
import { DateStatus } from './dateStatus.enum';

export class UpdateStatusValidation {
  @IsOptional()
  @IsEnum(UserStatus)
  userStatus: UserStatus;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  applicationStatus: ApplicationStatus;

  @IsOptional()
  @IsEnum(DateStatus)
  dateStatus: DateStatus;
}
