import {Column} from "typeorm";

export class DegreeInformation {
    @Column()
    academicDegree: String;

    @Column()
    years: Number;

    @Column()
    modality: String;

    @Column()
    startDate: String;

    @Column()
    cost: String;
}