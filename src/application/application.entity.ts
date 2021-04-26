import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { PersonalData } from './documents/personalData.dto';
import { Studies } from './documents/studies.dto';
import { Certificates } from './documents/certificates.dto';
import { Documents } from './documents/documents.dto';
import { Finances } from './documents/finances.dto';

@Entity()
export class StudentApplication {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  programId: ObjectID;

  @Column()
  userId: ObjectID;

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
