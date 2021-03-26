import { Column } from 'typeorm';

export class Certificates {
  @Column()
  testName: string;

  @Column()
  testScore: string;
}
