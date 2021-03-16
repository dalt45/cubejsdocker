import { Column } from 'typeorm';

export class DegreeInformation {
  @Column()
  academicDegree: string;

  @Column()
  years: number;

  @Column()
  modality: string;

  @Column()
  startDate: string;

  @Column()
  cost: string;
}
