import {Column} from "typeorm";

export class Employment {
    @Column()
    percentage: String;

    @Column()
    text: String;
}