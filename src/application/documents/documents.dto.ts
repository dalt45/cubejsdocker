import { Column } from 'typeorm';
import { SingleDocument } from './singleDocument.dto';

export class Documents {
  @Column()
  student: {
    passport: SingleDocument;
    recommendationLetter: SingleDocument;
    englishTest: SingleDocument;
    cv: SingleDocument;
  };

  @Column()
  institution: {
    acceptanceLetter: SingleDocument;
    finantialTest: SingleDocument;
  };

  @Column()
  additionalDocuments: SingleDocument[];
}
