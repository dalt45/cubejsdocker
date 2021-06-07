import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { PersonalData } from './documents/personalData.dto';
import { Studies } from './documents/studies.dto';
import { Certificates } from './documents/certificates.dto';
import { Documents } from './documents/documents.dto';
import { Finances } from './documents/finances.dto';
import { UserStatus } from './documents/userStatus.enum';
import { ApplicationStatus } from './documents/applicationStatus.enum';
import { Landing } from '../landing/landing.entity';
import { DateStatus } from './documents/dateStatus.enum';

@Entity()
export class StudentApplication {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  program: Landing;

  @Column()
  userId: ObjectID;

  @Column()
  startDate: Date;

  @Column()
  userStatus: UserStatus;

  @Column()
  dateUserStatus: Date;

  @Column()
  applicationStatus: ApplicationStatus;

  @Column()
  dateApplicationStatus: Date;

  @Column()
  dateStatus: DateStatus;

  @Column()
  dateDateStatus: Date;

  @Column()
  personalData: PersonalData;

  @Column()
  studies: Studies[];

  @Column()
  certificates: Certificates[];

  @Column()
  documents: {
    student: { [key: string]: { required: boolean; url: string } };
    institution: { [key: string]: { required: boolean; url: string } };
    additionalDocuments: [
      { [key: string]: { required: boolean; url: string } },
    ];
  };

  @Column()
  finances: Finances;

  @Column()
  isSubmitted: boolean;
}
