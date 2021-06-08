import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from 'mongodb';
import { PersonalData } from './personalData.dto';
import { Studies } from './studies.dto';
import { ValidationPersonalData } from './validation-application/validation-personalData.dto';
import { ValidationStudies } from './validation-application/validation-studies.dto';
import { ValidationCertificates } from './validation-application/validation-certificates.dto';
import { Certificates } from './certificates.dto';
import { ValidationFinances } from './validation-application/validation-finances.dto';
import { Finances } from './finances.dto';
import { StudentApplication } from '../application.entity';

export class ApplicationValidation {
  @IsMongoId()
  programId: ObjectID;

  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationPersonalData)
  personalData: PersonalData;

  @ValidateNested()
  @IsOptional()
  @Type(() => ValidationStudies)
  studies: Studies[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ValidationCertificates)
  certificates: Certificates[];

  @IsOptional()
  documents: StudentApplication['documents'];

  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationFinances)
  finances: Finances;
}
