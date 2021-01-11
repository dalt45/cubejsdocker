import { IsEmail, IsMongoId, IsOptional } from 'class-validator';

export class FindParams {
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsMongoId()
  @IsOptional()
  public id: string;
}
