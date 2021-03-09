import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing/landing.entity';
@Entity()
export class University {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  landings: Landing[];
}
