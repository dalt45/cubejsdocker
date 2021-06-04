import { Column } from 'typeorm';
import { Points } from './popular-programs/points.dto';

export class PopularPrograms {
  @Column()
  description: string;

  points: Points[];
}
