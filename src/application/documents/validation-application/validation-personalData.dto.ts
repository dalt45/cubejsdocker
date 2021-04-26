import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class ValidationPersonalData {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  phoneNumber: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsString()
  @IsOptional()
  tutorName: string;

  @IsString()
  @IsOptional()
  tutorRelationship: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  emergencyContactNumber: string;

  @IsOptional()
  @IsEmail()
  emergencyContactEmail: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsPostalCode()
  @IsOptional()
  postalCode: number;

  @IsString()
  @IsOptional()
  street: string;

  @IsNumber()
  @IsOptional()
  streetNumber: number;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  region: string;
}
