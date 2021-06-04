import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Landing {
  @Column()
  _id: ObjectID;

  @Column()
  contentProfileCourse: {
    name: string;
    courseType: string;
    startDates: Date[];
    briefAboutCourse: string;
    paragraphCourse: string;
    paragraphWhyStudy: string;
    courseContent: string;
    employmentStatistics: {
      fourMonths: string;
      internationalProjects: string;
      percentiles: {
        '1': string;
        '2': string;
        '3': string;
      };
    };
    prices: {
      averageYearCost: string;
      monthlyAccomodation: string;
      totalTuitionCost: string;
      beIntCost: string;
    };
    requirements: {
      IELTS: string;
      TOEFL: string;
      GMT: string;
    };
    otherRequirements: string;
  };

  @Column()
  createdBy: ObjectID;

  constructor(constructorObject) {
    this.contentProfileCourse = constructorObject.contentPorfileCourse;
    this._id = new ObjectID();
  }
}
