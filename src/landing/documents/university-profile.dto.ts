import { Column } from 'typeorm';

export class UniversityProfile {
  @Column()
  urlImageLogo: string;

  @Column()
  titleCourse: string;

  @Column()
  nameUniversity: string;

  @Column()
  countryFlag: string;

  @Column()
  nameCity: string;

  @Column()
  nameCountry: string;
}
