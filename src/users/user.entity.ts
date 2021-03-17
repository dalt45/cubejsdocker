import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { UserType } from './enums/userType.enum';

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
}
