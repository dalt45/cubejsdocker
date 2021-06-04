import { Column } from 'typeorm';
import { SingleDocument } from './singleDocument.dto';

export class Documents {
  @Column()
  student: SingleDocument[];

  @Column()
  institution: SingleDocument[];
}
