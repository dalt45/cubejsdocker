import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { UserType } from './enums/userType.enum';
import { Status } from './enums/status.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  googleAccessToken: string;

  @Column()
  type: UserType;

  @Column()
  university: ObjectID;

  @Column()
  status: Status;

  @Column()
  lastLogged: Date;

  @Column()
  @Unique(['confirmationCode'])
  confirmationCode: string;
}
