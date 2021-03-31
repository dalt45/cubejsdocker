import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing/landing.entity';

@Entity()
export class University {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Unique(['name'])
  name: string;

  @Column()
  createdBy: ObjectID;

  @Column()
  landings: Landing[];
}
