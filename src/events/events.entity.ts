import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { EventBI } from './enums/event.enum';

@Entity()
export class ApplicationEvent {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  timeStamp: Date;

  @Column()
  event: EventBI;

  @Column()
  eventKey: string;

  @Column()
  value: string;
}
