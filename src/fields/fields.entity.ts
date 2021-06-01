import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Landing } from 'src/landing/landing.entity';

export class Field {
  @Column()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  createdBy: ObjectID;

  @Column()
  landings: Landing[];

  constructor(constructorObject) {
    this._id = new ObjectID();
    this.name = constructorObject?.name || '';
    this.landings = [];
  }
}
