import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserType } from '../enums/userType.enum';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
