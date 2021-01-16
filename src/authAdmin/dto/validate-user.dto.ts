import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
