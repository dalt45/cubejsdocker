import {Column} from "typeorm";
import { Agenda } from "./course-information/agenda.dto";
import { Employment } from "./course-information/employment.dto";

export class CourseInformation {
    @Column()
    courseAgenda: Agenda[];

    @Column()
    employmentStatistics: Employment;
}