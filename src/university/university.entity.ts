import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Landing } from '../landing/landing.entity';
import { Campus } from 'src/campus/campus.entity';

@Entity()
export class University {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  createdBy: ObjectID;

  @Column()
  contentProfileUniversity: {
    nameCity: string;
    nameCountry: string;
    name: string;
    descriptionParagraph: string;
    videoUrl: string;
    type: string;
  };

  @Column()
  images: {
    urlImageLogo: { [url: string]: string };
    urlCountryFlag: { [url: string]: string };
    urlMainImage: { [url: string]: string };
    photoGallery: [{ [url: string]: string }];
  };

  @Column()
  campus: Campus[];

  @Column()
  landings: Landing[];
}
