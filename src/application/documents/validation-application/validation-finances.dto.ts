import { IsOptional, IsString } from 'class-validator';

export class ValidationFinances {
  @IsString()
  @IsOptional()
  paymentType: string;

  @IsString()
  @IsOptional()
  startYear: string;

  @IsOptional()
  @IsString()
  startMonth: string;
}
