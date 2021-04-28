import { Column } from 'typeorm';

export class SingleDocument {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  status: string;
}
