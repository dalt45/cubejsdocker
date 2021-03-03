import {Column} from "typeorm";

export class Agenda {
    @Column()
    lesson: String;
}