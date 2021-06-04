import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Campus } from '../campus.entity';
import { CampusValidation } from './campus-validation.dto';

export class CreateCampusDto {
  @IsNotEmpty()
  @IsMongoId()
  universityId: ObjectID;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => CampusValidation)
  campus: Campus;
}
