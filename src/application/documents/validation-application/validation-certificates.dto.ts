import { IsOptional, IsString } from 'class-validator';

export class ValidationCertificates {
  @IsOptional()
  @IsString()
  testName: string;

  @IsOptional()
  @IsString()
  testScore: string;
}
