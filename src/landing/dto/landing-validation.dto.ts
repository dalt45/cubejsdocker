import {
  ArrayNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Landing } from '../landing.entity';

export class LandingValidation {
  // For strict validation
  // @IsDefined()
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContentProfileCourse)
  contentProfileCourse: Landing['contentProfileCourse'];
}

// tslint:disable-next-line: max-classes-per-file
class ContentProfileCourse {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  courseType: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Date)
  startDates: Date[];

  @IsString()
  @IsOptional()
  briefAboutCourse: string;

  @IsString()
  @IsOptional()
  paragraphCourse: string;

  @IsString()
  @IsOptional()
  paragraphWhyStudy: string;

  @IsString()
  @IsOptional()
  courseContent: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  durationUnit: string;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => EmploymentStatistics)
  employmentStatistics: Landing['contentProfileCourse']['employmentStatistics'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Prices)
  prices: Landing['contentProfileCourse']['prices'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Requirements)
  requirements: Landing['contentProfileCourse']['requirements'];

  @IsString()
  @IsOptional()
  otherRequirements: string;
}

// tslint:disable-next-line: max-classes-per-file
class EmploymentStatistics {
  @IsString()
  @IsOptional()
  fourMonths: string;

  @IsString()
  @IsOptional()
  internationalProjects: string;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Percentiles)
  percentiles: Landing['contentProfileCourse']['employmentStatistics']['percentiles'];
}

// tslint:disable-next-line: max-classes-per-file
class Percentiles {
  @IsString()
  @IsOptional()
  '1': string;

  @IsString()
  @IsOptional()
  '2': string;

  @IsString()
  @IsOptional()
  '3': string;
}

// tslint:disable-next-line: max-classes-per-file
class Prices {
  @IsString()
  @IsOptional()
  averageYearCost: string;

  @IsString()
  @IsOptional()
  monthlyAccomodation: string;

  @IsString()
  @IsOptional()
  totalTuitionCost: string;

  @IsString()
  @IsOptional()
  beIntCost: string;
}

// tslint:disable-next-line: max-classes-per-file
class Requirements {
  @IsString()
  @IsOptional()
  IELTS: string;

  @IsString()
  @IsOptional()
  TOEFL: string;

  @IsString()
  @IsOptional()
  GMT: string;
}
