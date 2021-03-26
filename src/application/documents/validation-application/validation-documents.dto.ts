import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ValidationDocuments {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  status: string;
}
