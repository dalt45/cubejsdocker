import { IsNotEmpty } from 'class-validator';

export class CreateUserGoogleDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  email: string;
}
