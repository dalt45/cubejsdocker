import { Column } from 'typeorm';

export class Documents {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  status: string;
}
