import {
  ArrayNotEmpty,
  IsBase64,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ValidationDocuments {
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => ValidationSingleDocuments)
  student: ValidationSingleDocuments[];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => ValidationSingleDocuments)
  institution: ValidationSingleDocuments[];
}

// tslint:disable-next-line: max-classes-per-file
export class ValidationSingleDocuments {
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
