import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
  Allow,
  IsBoolean,
} from 'class-validator';

export class UniversityProfile {
  @IsOptional()
  @IsUrl()
  urlImageLogo: string;

  @IsString()
  @IsOptional()
  titleCourse: string;

  @IsString()
  @IsOptional()
  nameUniversity: string;

  @IsUrl()
  @IsOptional()
  countryFlag: string;

  @IsString()
  @IsOptional()
  nameCity: string;

  @IsString()
  @IsOptional()
  nameCountry: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageHeaderPageUniversities: string;
}

// tslint:disable-next-line: max-classes-per-file
export class DegreeInformation {
  @IsString()
  @IsOptional()
  academicDegree: string;

  @IsNumber()
  @IsOptional()
  years: number;

  @IsString()
  @IsOptional()
  modality: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  cost: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UniversityVideos {
  @IsUrl()
  @IsOptional()
  urlVideo: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CourseContent {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  informationCourse: string;
}

// tslint:disable-next-line: max-classes-per-file
export class FeaturedInformation {
  @IsUrl()
  urlImage: string;

  @IsString()
  textParagraph: string;
}

// tslint:disable-next-line: max-classes-per-file
export class ContentParagraph {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  descriptionParagraph: string;
}

// tslint:disable-next-line: max-classes-per-file
export class GalleryCourse {
  @IsUrl()
  url: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CourseButton {
  @IsString()
  @IsOptional()
  textCourse: string;
}

// tslint:disable-next-line: max-classes-per-file
export class Reason {
  @IsString()
  @IsOptional()
  reason: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CourseInformation {
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Agenda)
  courseAgenda: Agenda[];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Employment)
  employmentStatistics: Employment[];
}

// tslint:disable-next-line: max-classes-per-file
class Agenda {
  @IsString()
  lesson: string;
}

// tslint:disable-next-line: max-classes-per-file
class Employment {
  @IsString()
  percentage: string;

  @IsString()
  text: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PopularProgram {
  @IsString()
  description: string;

  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => Point)
  points: Point[];
}

// tslint:disable-next-line: max-classes-per-file
class Point {
  @IsString()
  @Allow()
  text: string;
}

// tslint:disable-next-line: max-classes-per-file
export class ApplicationDocuments {
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Document)
  institution: Document[];
  student: Document[];
}

// tslint:disable-next-line: max-classes-per-file
class Document {
  @IsString()
  name: string;

  @IsBoolean()
  isRequired: boolean;
}
