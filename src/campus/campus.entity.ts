import { Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Field } from 'src/fields/fields.entity';

export class Campus {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  createdBy: ObjectID;

  @Column()
  contentProfileCampus: {
    nameCity: string;
    nameCountry: string;
    briefUniversity: string;
    briefWhyStudy: string;
    funfacts: [{ [text: string]: string }];
    location: string;
    paragraphUniversity: string;
    paragraphHighlight: string;
    paragraphWhyStudy: string;
    popularProgramsParagraph: string;
    bachelorDegrees: string;
    masterDegrees: string;
    phdDegrees: string;
    highlights: [{ [text: string]: string }];
    peopleHighlights: string;
  };

  @Column()
  images: {
    mainImage: { [url: string]: string };
    photoGallery: [{ [url: string]: string }];
  };

  @Column()
  fields: Field[];

  constructor(constructorObject) {
    this.contentProfileCampus = constructorObject?.contentProfileCampus;
    this.images = constructorObject?.images;
    this.fields = [];
    this._id = new ObjectID();
  }
}
