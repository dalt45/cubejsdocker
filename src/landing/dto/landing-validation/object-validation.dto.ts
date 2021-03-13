import { Type } from "class-transformer";
import { ArrayNotEmpty, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";

export class UniversityProfile {
    @IsOptional()
    @IsUrl()
    urlImageLogo: String;

    @IsString()
    @IsOptional()
    titleCourse: String;

    @IsString()
    @IsOptional()
    nameUniversity: String;

    @IsUrl()
    @IsOptional()
    countryFlag: String;

    @IsString()
    @IsOptional()
    nameCity: String;
    
    @IsString()
    @IsOptional()
    nameCountry: String
}

export class DegreeInformation {
    @IsString()
    @IsOptional()
    academicDegree: String;

    @IsNumber()
    @IsOptional()
    years: Number;

    @IsString()
    @IsOptional()
    modality: String;

    @IsString()
    @IsOptional()
    startDate: String;

    @IsString()
    @IsOptional()
    cost: String;
}

export class UniversityVideos {
    @IsUrl()
    @IsOptional()
    urlVideo: String;
}

export class CourseContent {
    @IsString()
    @IsOptional()
    title: String;

    @IsString()
    @IsOptional()
    informationCourse: String;
}

export class FeaturedInformation {
    @IsUrl()
    urlImage: String;

    @IsString()
    textParagraph: String;
}

export class ContentParagraph {
    @IsString()
    @IsOptional()
    title: String;

    @IsString()
    @IsOptional()
    descriptionParagraph: String;
}

export class GalleryCourse {
    @IsUrl()
    url: String;
}

export class CourseButton {
    @IsString()
    @IsOptional()
    textCourse: String;
}

export class Reason {
    @IsString()
    @IsOptional()
    reason: String;
}

export class CourseInformation {
    @ValidateNested()
    @ArrayNotEmpty()
    @IsOptional()
    @Type(()=> Agenda)
    courseAgenda: Agenda[];

    @ValidateNested()
    @ArrayNotEmpty()
    @IsOptional()
    @Type(()=> Employment)
    employmentStatistics: Employment[];
}

class Agenda {
    @IsString()
    lesson: String;
}

class Employment {
    @IsString()
    percentage: String;

    @IsString()
    text: String;
}
