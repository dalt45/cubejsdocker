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
    this.contentProfileCampus = {
      nameCity: constructorObject?.contentProfileCampus?.nameCity || '',
      nameCountry: constructorObject?.contentProfileCampus?.nameCountry || '',
      briefUniversity:
        constructorObject?.contentProfileCampus?.briefUniversity || '',
      briefWhyStudy:
        constructorObject?.contentProfileCampus?.briefWhyStudy || '',
      funfacts: constructorObject?.contentProfileCampus?.funfacts || [],
      location: constructorObject?.contentProfileCampus?.location || '',
      paragraphUniversity:
        constructorObject?.contentProfileCampus?.paragraphUniversity || '',
      paragraphHighlight:
        constructorObject?.contentProfileCampus?.paragraphHighlight || '',
      paragraphWhyStudy:
        constructorObject?.contentProfileCampus?.paragraphWhyStudy || '',
      popularProgramsParagraph:
        constructorObject?.contentProfileCampus?.popularProgramsParagraph || '',
      bachelorDegrees:
        constructorObject?.contentProfileCampus?.bachelorDegrees || '',
      masterDegrees:
        constructorObject?.contentProfileCampus?.masterDegrees || '',
      phdDegrees: constructorObject?.contentProfileCampus?.phdDegrees || '',
      highlights: constructorObject?.contentProfileCampus?.highlights || [],
      peopleHighlights:
        constructorObject?.contentProfileCampus?.peopleHighlights || '',
    };
    this.images = {
      mainImage: { ...(constructorObject?.images?.mainImage || { url: '' }) },
      photoGallery: constructorObject?.images?.photoGallery || [],
    };
    this.fields = [];
    this._id = new ObjectID();
  }
}
