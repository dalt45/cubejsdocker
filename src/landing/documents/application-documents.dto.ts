import { Column } from 'typeorm';

export class ApplicationDocument {
  @Column()
  name: string;

  @Column()
  isRequired: boolean;
}
