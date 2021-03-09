import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing.entity';
import { LandingValidation } from './landing-validation.dto';

export class CreateLandingDto {
  @IsNotEmpty()
  @IsMongoId()
  id: ObjectID;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => LandingValidation)
  landing: Landing[];
}
