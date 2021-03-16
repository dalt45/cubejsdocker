import {Column} from "typeorm";

export class ContentParagraph {
    @Column()
    title: String;

    @Column()
    descriptionParagraph: String;
}