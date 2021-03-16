import {Column} from "typeorm";

export class Reason {
    @Column()
    reason: String;
}