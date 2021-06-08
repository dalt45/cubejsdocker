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
import { ValidationDocuments } from './validation-application/validation-documents.dto';
import { Documents } from './documents.dto';
import { ValidationFinances } from './validation-application/validation-finances.dto';
import { Finances } from './finances.dto';
import { StudentApplication } from '../application.entity';

export class ApplicationValidation {
  @IsMongoId()
  programId: ObjectID;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationPersonalData)
  personalData: PersonalData;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => ValidationStudies)
  studies: Studies[];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => ValidationCertificates)
  certificates: Certificates[];

  @IsNotEmptyObject()
  @IsOptional()
  documents: StudentApplication['documents'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationFinances)
  finances: Finances;
}
