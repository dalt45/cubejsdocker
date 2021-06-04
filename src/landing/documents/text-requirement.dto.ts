import { Column } from 'typeorm';

export class TextRequirement {
  @Column()
  text: string;
}
