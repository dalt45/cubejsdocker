import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Field {
  @Column()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  createdBy: ObjectID;

  constructor(constructorObject) {
    this._id = new ObjectID();
    this.name = constructorObject.name;
  }
}
