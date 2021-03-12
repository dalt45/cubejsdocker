import {Column} from "typeorm";

export class FeaturedInformation {
    @Column()
    urlImage: String;

    @Column()
    textParagraph: String;
}