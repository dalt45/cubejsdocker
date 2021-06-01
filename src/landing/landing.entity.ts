import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Landing {
  @Column()
  _id: ObjectID;

  @Column()
  contentProfileCourse: {
    name: string;
    courseType: string;
    startDates: StartDate[];
    briefAboutCourse: string;
    paragraphCourse: string;
    paragraphWhyStudy: string;
    courseContent: string;
    duration: string;
    durationUnit: string;
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
    this.contentProfileCourse = {
      name: constructorObject?.contentProfileCourse?.name || '',
      courseType: constructorObject?.contentProfileCourse?.courseType || '',
      startDates: constructorObject?.contentProfileCourse?.startDates || [],
      briefAboutCourse:
        constructorObject?.contentProfileCourse?.briefAboutCourse || '',
      paragraphCourse:
        constructorObject?.contentProfileCourse?.paragraphCourse || '',
      paragraphWhyStudy:
        constructorObject?.contentProfileCourse?.paragraphWhyStudy || '',
      courseContent:
        constructorObject?.contentProfileCourse?.courseContent || '',
      duration: constructorObject?.contentProfileCourse?.duration || '',
      durationUnit: constructorObject?.contentProfileCourse?.durationUnit || '',
      employmentStatistics: {
        fourMonths:
          constructorObject?.contentProfileCourse?.employmentStatistics
            ?.fourMonths || '',
        internationalProjects:
          constructorObject?.contentProfileCourse?.employmentStatistics
            ?.fourMonths || '',
        percentiles: {
          '1':
            constructorObject?.contentProfileCourse?.employmentStatistics
              ?.percentiles['1'] || '',
          '2':
            constructorObject?.contentProfileCourse?.employmentStatistics
              ?.percentiles['2'] || '',
          '3':
            constructorObject?.contentProfileCourse?.employmentStatistics
              ?.percentiles['3'] || '',
        },
      },
      prices: {
        averageYearCost:
          constructorObject?.contentProfileCourse?.prices?.averageYearCost ||
          '',
        monthlyAccomodation:
          constructorObject?.contentProfileCourse?.prices
            ?.monthlyAccomodation || '',
        totalTuitionCost:
          constructorObject?.contentProfileCourse?.prices?.totalTuitionCost ||
          '',
        beIntCost:
          constructorObject?.contentProfileCourse?.prices?.beIntCost || '',
      },
      requirements: {
        IELTS:
          constructorObject?.contentProfileCourse?.requirements?.IELTS || '',
        TOEFL:
          constructorObject?.contentProfileCourse?.requirements?.TOEFL || '',
        GMT: constructorObject?.contentProfileCourse?.requirements?.GMT || '',
      },
      otherRequirements:
        constructorObject?.contentProfileCourse?.otherRequirements || '',
    };
    this._id = new ObjectID();
  }
}

// tslint:disable-next-line: max-classes-per-file
class StartDate {
  year: number;
  month: number;
}
