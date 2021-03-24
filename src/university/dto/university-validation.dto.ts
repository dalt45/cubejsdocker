import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Landing } from '../../landing/landing.entity';
import { LandingValidation } from 'src/landing/dto/landing-validation.dto';

export class UniversityValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => LandingValidation)
  landings: Landing[];
}
