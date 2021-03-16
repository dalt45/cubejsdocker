import { Column } from 'typeorm';

export class CourseContent {
  @Column()
  title: string;

  @Column()
  informationCourse: string;
}
