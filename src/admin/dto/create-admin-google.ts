import { IsNotEmpty } from 'class-validator';

export class CreateAdminGoogleDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  email: string;
}
