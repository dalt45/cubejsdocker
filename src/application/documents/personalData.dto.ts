import { Column } from 'typeorm';

export class PersonalData {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  @Column()
  birthDate: Date;

  @Column()
  tutorName: string;

  @Column()
  tutorRelationship: string;

  @Column()
  emergencyContactNumber: string;

  @Column()
  emergencyContactEmail: string;

  @Column()
  country: string;

  @Column()
  postalCode: number;

  @Column()
  street: string;

  @Column()
  streetNumber: number;

  @Column()
  city: string;

  @Column()
  region: string;
}
