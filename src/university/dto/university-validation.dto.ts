import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Landing } from '../../landing/landing.entity';
import { LandingValidation } from 'src/landing/dto/landing-validation.dto';
import { ObjectID } from 'mongodb';

export class UniversityValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  createdBy: ObjectID;

  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => LandingValidation)
  landings: Landing[];
}
