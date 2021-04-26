import { Column } from 'typeorm';
import { CourseContent } from './documents/course-content.dto';
import { DegreeInformation } from './documents/degree-information.dto';
import { FeaturedInformation } from './documents/featured-information.dto';
import { UniversityProfile } from './documents/university-profile.dto';
import { UniversityVideos } from './documents/university-videos.dto';
import { ContentParagraph } from './documents/content-paragraph.dto';
import { GalleryCourse } from './documents/gallery-course.dto';
import { CourseButton } from './documents/course-button.dto';
import { Reason } from './documents/reasons.dto';
import { CourseInformation } from './documents/course-information.dto';
import { ObjectID } from 'mongodb';
import { PopularPrograms } from './documents/popular-programs.dto';

export class Landing {
  @Column()
  _id: ObjectID;

  @Column()
  createdBy: ObjectID;

  @Column()
  contentProfileUniversity: UniversityProfile;

  @Column()
  informationUniversity: DegreeInformation;

  @Column()
  contentVideosUniversities: UniversityVideos;

  @Column()
  contentAboutCourse: CourseContent;

  @Column()
  contentFeaturedInformation: FeaturedInformation[];

  @Column()
  contentParagraphUniversity: ContentParagraph;

  @Column()
  contentParagraphMoreInformation: ContentParagraph;

  @Column()
  universityLocation: string;

  @Column()
  contentGalleryCourse: GalleryCourse[];

  @Column()
  textButtonOtherCourses: CourseButton[];

  @Column()
  contentDesciptionCourse: CourseContent;

  @Column()
  reasonsToChooseThisProgram: Reason[];

  @Column()
  courseContentInformation: CourseInformation;

  @Column()
  popularPrograms: PopularPrograms;

  constructor(
    /* contentProfileUniversity: UniversityProfile,
    informationUniversity: DegreeInformation,
    contentVideosUniversities: UniversityVideos,
    contentAboutCourse: CourseContent,
    contentFeaturedInformation: FeaturedInformation[],
    contentParagraphUniversity: ContentParagraph,
    contentParagraphMoreInformation: ContentParagraph,
    universityLocation: string,
    contentGalleryCourse: GalleryCourse[],
    textButtonOtherCourses: CourseButton[],
    contentDesciptionCourse: CourseContent,
    reasonsToChooseThisProgram: Reason[],
    courseContentInformation: CourseInformation, */
    constructorObject,
  ) {
    this.contentProfileUniversity = constructorObject.contentProfileUniversity;
    this.informationUniversity = constructorObject.informationUniversity;
    this.contentVideosUniversities =
      constructorObject.contentVideosUniversities;
    this.contentAboutCourse = constructorObject.contentAboutCourse;
    this.contentFeaturedInformation =
      constructorObject.contentFeaturedInformation;
    this.contentParagraphUniversity =
      constructorObject.contentParagraphUniversity;
    this.contentParagraphUniversity =
      constructorObject.contentParagraphUniversity;
    this.contentParagraphMoreInformation =
      constructorObject.contentParagraphMoreInformation;
    this.universityLocation = constructorObject.universityLocation;
    this.contentGalleryCourse = constructorObject.contentGalleryCourse;
    this.textButtonOtherCourses = constructorObject.textButtonOtherCourses;
    this.contentDesciptionCourse = constructorObject.contentDesciptionCourse;
    this.reasonsToChooseThisProgram =
      constructorObject.reasonsToChooseThisProgram;
    this.courseContentInformation = constructorObject.courseContentInformation;
    this._id = new ObjectID();
    this.createdBy = constructorObject.createdBy;
    this.popularPrograms = constructorObject.popularPrograms;
  }
}
