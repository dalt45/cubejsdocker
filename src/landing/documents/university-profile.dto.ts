import {Column} from "typeorm";

export class UniversityProfile {
    @Column()
    urlImageLogo: String;

    @Column()
    titleCourse: String;

    @Column()
    nameUniversity: String;

    @Column()
    countryFlag: String;

    @Column()
    nameCity: String;
    
    @Column()
    nameCountry: String
}
