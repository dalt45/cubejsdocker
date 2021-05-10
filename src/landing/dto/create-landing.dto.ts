import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing.entity';
import { LandingValidation } from './landing-validation.dto';

export class CreateLandingDto {
  @IsNotEmpty()
  @IsMongoId()
  fieldId: ObjectID;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => LandingValidation)
  landing: Landing;
}
