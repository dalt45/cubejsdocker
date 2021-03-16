import {Column} from "typeorm";

export class CourseContent {
    @Column()
    title: String;

    @Column()
    informationCourse: String;
}