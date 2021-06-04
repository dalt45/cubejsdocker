import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing/landing.entity';
import { Campus } from 'src/campus/campus.entity';

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
  campus: Campus[];

  @Column()
  landings: Landing[];
}
