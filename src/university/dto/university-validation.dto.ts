import {
  ArrayNotEmpty,
  IsBase64,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CampusValidation } from 'src/campus/dto/campus-validation.dto';
import { Campus } from 'src/campus/campus.entity';
import { University } from '../university.entity';

export class UniversityValidation {
  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => ContentProfileUniversity)
  contentProfileUniversity: University['contentProfileUniversity'];

  @ArrayNotEmpty()
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => CampusValidation)
  campus: Campus[];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Images)
  images: University['images'];
}

// tslint:disable-next-line: max-classes-per-file
class ContentProfileUniversity {
  @IsString()
  @IsOptional()
  nameCity: string;

  @IsString()
  @IsOptional()
  nameCountry: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  descriptionParagraph: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  videoUrl: string;
}

// tslint:disable-next-line: max-classes-per-file
class Images {
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoGallery)
  urlCountryFlag: University['images']['urlCountryFlag'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoGallery)
  urlImageLogo: University['images']['urlImageLogo'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoGallery)
  urlMainImage: University['images']['urlMainImage'];

  @ArrayNotEmpty()
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => PhotoGallery)
  photoGallery: Campus['images']['photoGallery'];
}

// tslint:disable-next-line: max-classes-per-file
class PhotoGallery {
  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;

  @IsString()
  @IsBase64()
  @IsOptional()
  file: string;
}
