import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Admin {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  googleAccessToken: string;
}
