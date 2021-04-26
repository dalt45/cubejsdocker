import { Column } from 'typeorm';

export class Finances {
  @Column()
  paymentType: string;

  @Column()
  startYear: string;

  @Column()
  startMonth: string;
}
