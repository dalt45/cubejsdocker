import { CourseContent } from '../documents/course-content.dto';
import { FeaturedInformation } from '../documents/featured-information.dto';
import * as validator from './landing-validation/object-validation.dto'
import { ContentParagraph } from '../documents/content-paragraph.dto'
import { GalleryCourse } from '../documents/gallery-course.dto'
import { CourseButton } from '../documents/course-button.dto';
import { Reason } from '../documents/reasons.dto'
import { ArrayNotEmpty, IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsUrl, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UniversityProfile } from '../documents/university-profile.dto';
import { DegreeInformation } from '../documents/degree-information.dto';
import { UniversityVideos } from '../documents/university-videos.dto';
import { CourseInformation } from '../documents/course-information.dto';

export class LandingValidation {
  //For strict validation
  //@IsDefined()
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.UniversityProfile)
  contentProfileUniversity: UniversityProfile

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.DegreeInformation)
  informationUniversity: DegreeInformation;

  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(()=> validator.UniversityVideos)
  contentVideosUniversities: UniversityVideos;

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.CourseContent)
  contentAboutCourse: CourseContent

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(()=> validator.FeaturedInformation)
  contentFeaturedInformation: FeaturedInformation[]

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.ContentParagraph)
  contentParagraphUniversity: ContentParagraph

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.ContentParagraph)
  contentParagraphMoreInformation: ContentParagraph

  @IsUrl()
  universityLocation: String

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(()=> validator.GalleryCourse)
  contentGalleryCourse: GalleryCourse[]

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(()=> validator.CourseButton)
  textButtonOtherCourses: CourseButton[]

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.CourseContent)
  contentDescriptionCourse: CourseContent;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @Type(()=> validator.Reason)
  reasonsToChooseThisProgram: Reason[];

  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(()=> validator.CourseInformation)
  courseContentInformation: CourseInformation;
}