import {
  ArrayNotEmpty,
  IsBase64,
  IsBoolean,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Documents } from '../documents.dto';

class ValidationSingleDocuments {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBase64()
  file: string;

  @IsOptional()
  @IsBoolean()
  isRequired: boolean;
}

// tslint:disable-next-line: max-classes-per-file
class StudentDocuments {
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationSingleDocuments)
  passport: ValidationSingleDocuments;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationSingleDocuments)
  recommendationLetter: ValidationSingleDocuments;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationSingleDocuments)
  englishTest: ValidationSingleDocuments;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationSingleDocuments)
  cv: ValidationSingleDocuments;
}

// tslint:disable-next-line: max-classes-per-file
export class ValidationDocuments {
  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => StudentDocuments)
  student: StudentDocuments;

  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => InstitutionDocuments)
  institution: Documents['institution'];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => ValidationSingleDocuments)
  additionalDocuments: Documents['additionalDocuments'];
}

// tslint:disable-next-line: max-classes-per-file
class InstitutionDocuments {
  @ValidateNested()
  @IsOptional()
  acceptanceLetter: ValidationSingleDocuments;

  @ValidateNested()
  @IsOptional()
  finantialTest: ValidationSingleDocuments;
}
// tslint:disable-next-line: max-classes-per-file
