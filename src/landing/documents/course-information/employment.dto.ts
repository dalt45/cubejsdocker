import { Column } from 'typeorm';

export class Employment {
  @Column()
  percentage: string;

  @Column()
  text: string;
}
