import { Column } from 'typeorm';

export class FeaturedInformation {
  @Column()
  urlImage: string;

  @Column()
  textParagraph: string;
}
