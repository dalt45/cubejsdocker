import { Column } from 'typeorm';

export class ScoreRequirement {
  @Column()
  text: string;

  @Column()
  score: string;
}
