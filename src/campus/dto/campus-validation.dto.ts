import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBase64,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Campus } from '../campus.entity';

export class CampusValidation {
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContentProfileCampus)
  contentProfileCampus: Campus['contentProfileCampus'];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Images)
  images: Campus['images'];
}

// tslint:disable-next-line: max-classes-per-file
class ContentProfileCampus {
  @IsOptional()
  @IsString()
  nameCity: string;

  @IsOptional()
  @IsString()
  nameCountry: string;

  @IsOptional()
  @IsString()
  briefUniversity: string;

  @IsOptional()
  @IsString()
  briefWhyStudy: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Funfacts)
  funfacts: Campus['contentProfileCampus']['funfacts'];

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  paragraphUniversity: string;

  @IsOptional()
  @IsString()
  paragraphHighlight: string;

  @IsOptional()
  @IsString()
  paragraphWhyStudy: string;

  @IsOptional()
  @IsString()
  popularProgramsParagraph: string;

  @IsOptional()
  @IsString()
  bachelorDegrees: string;

  @IsOptional()
  @IsString()
  masterDegrees: string;

  @IsOptional()
  @IsString()
  phdDegrees: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => Funfacts)
  highlights: Campus['contentProfileCampus']['highlights'];

  @IsOptional()
  @IsString()
  peopleHighlights: string;
}

// tslint:disable-next-line: max-classes-per-file
class Funfacts {
  @IsString()
  text: string;
}

// tslint:disable-next-line: max-classes-per-file
class Images {
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoGallery)
  mainImage: Campus['images']['photoGallery'];

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
