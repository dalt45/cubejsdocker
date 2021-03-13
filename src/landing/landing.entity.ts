import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { CourseContent } from './documents/course-content.dto';
import { DegreeInformation } from './documents/degree-information.dto';
import { FeaturedInformation } from './documents/featured-information.dto';
import { UniversityProfile } from './documents/university-profile.dto'
import { UniversityVideos } from './documents/university-videos.dto'
import { ContentParagraph } from './documents/content-paragraph.dto'
import { GalleryCourse } from './documents/gallery-course.dto'
import { CourseButton } from './documents/course-button.dto';
import { Reason } from './documents/reasons.dto'
import { CourseInformation } from './documents/course-information.dto';

@Entity()
export class Landing {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  contentProfileUniversity: UniversityProfile;

  @Column()
  informationUniversity: DegreeInformation;

  @Column()
  contentVideosUniversities: UniversityVideos;

  @Column()
  contentAboutCourse: CourseContent;

  @Column()
  contentFeaturedInformation: FeaturedInformation[]

  @Column()
  contentParagraphUniversity: ContentParagraph

  @Column()
  contentParagraphMoreInformation: ContentParagraph

  @Column()
  universityLocation: String

  @Column()
  contentGalleryCourse: GalleryCourse[]

  @Column()
  textButtonOtherCourses: CourseButton[]

  @Column()
  contentDesciptionCourse: CourseContent;

  @Column()
  reasonsToChooseThisProgram: Reason[];

  @Column()
  courseContentInformation: CourseInformation;
}
