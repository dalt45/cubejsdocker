import { Column } from 'typeorm';

export class Studies {
  @Column()
  grade: string;

  @Column()
  area: string;

  @Column()
  institution: string;

  @Column()
  startYear: number;

  @Column()
  endYear: number;

  @Column()
  scoreType: string;

  @Column()
  score: string;
}
