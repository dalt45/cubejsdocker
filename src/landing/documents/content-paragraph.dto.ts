import { Column } from 'typeorm';

export class ContentParagraph {
  @Column()
  title: string;

  @Column()
  descriptionParagraph: string;
}
