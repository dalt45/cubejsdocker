import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ValidationStudies {
  @IsString()
  @IsOptional()
  grade: string;

  @IsString()
  @IsOptional()
  area: string;

  @IsString()
  @IsOptional()
  institution: string;

  @IsNumber()
  @IsOptional()
  startYear: number;

  @IsNumber()
  @IsOptional()
  endYear: number;

  @IsString()
  @IsOptional()
  scoreType: string;

  @IsString()
  @IsOptional()
  score: string;
}
