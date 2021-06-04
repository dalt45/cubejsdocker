import { IsOptional, IsString } from 'class-validator';

export class FieldValidation {
  @IsOptional()
  @IsString()
  name: string;
}
