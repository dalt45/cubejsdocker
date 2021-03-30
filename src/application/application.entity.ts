import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { PersonalData } from './documents/personalData.dto';
import { Studies } from './documents/studies.dto';
import { Certificates } from './documents/certificates.dto';
import { Documents } from './documents/documents.dto';
import { Finances } from './documents/finances.dto';
import { UserStatus } from './documents/userStatus.enum';
import { ApplicationStatus } from './documents/applicationStatus.enum';
import { Landing } from 'src/landing/landing.entity';

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
  personalData: PersonalData;

  @Column()
  studies: Studies[];

  @Column()
  certificates: Certificates[];

  @Column()
  documents: Documents[];

  @Column()
  finances: Finances;
}
