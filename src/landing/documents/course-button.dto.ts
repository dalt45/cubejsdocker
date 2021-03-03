import {Column} from "typeorm";

export class CourseButton {
    @Column()
    key: Number;

    @Column()
    textCourse: String;
}