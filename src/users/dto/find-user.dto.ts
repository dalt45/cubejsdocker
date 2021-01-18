import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectID } from 'mongodb';

export class FindUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  id: ObjectID;
}
