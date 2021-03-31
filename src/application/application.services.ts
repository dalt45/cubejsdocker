import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ServiceMessages } from 'src/utils/serviceResponse/ResponseDictionary';
import { Repository, Connection } from 'typeorm';
import { StudentApplication } from './application.entity';
import { ApplicationValidation } from './documents/validation-application.dto';
import { ObjectID } from 'mongodb';
import { EditApplicationValidation } from './documents/validation-application-edit.dto';
import { University } from 'src/university/university.entity';
import { UserStatus } from './documents/userStatus.enum';
import { ApplicationStatus } from './documents/applicationStatus.enum';
import { LandingService } from 'src/landing/landing.service';
import { DateStatus } from './documents/dateStatus.enum';
import { UpdateStatusValidation } from './documents/validation-application-updateStatus.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(StudentApplication)
    private applicationRepository: Repository<StudentApplication>,
    @InjectConnection()
    private connection: Connection,
    private readonly landingService: LandingService,
  ) {}

  async create(application: ApplicationValidation, user: User): Promise<any> {
    try {
      const defaultObject = {
        date: Date.now(),
        userStatus: UserStatus.BOOKING,
        dateUserStatus: Date.now(),
        applicationStatus: ApplicationStatus.DEPOSIT,
        dateApplicationStatus: Date.now(),
        dateStatus: DateStatus.DOCUMENTS,
        dateDateStatus: Date.now(),
        startDate: Date.now(),
      };
      const landing = await this.landingService.get({
        id: application.programId,
      });
      delete application.programId;
      const newApplication = await this.applicationRepository.save({
        ...application,
        ...defaultObject,
        userId: user.id,
        program: landing.body,
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: { id: newApplication.id },
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
        body: {},
      };
    }
  }

  async updateUserWithApplication(user, applicationId: ObjectID) {
    let applicationsArray = [];
    const manager = this.connection.getMongoRepository(User);
    const dbUser = await manager.findOne({
      where: { _id: { $eq: new ObjectID(user.id) } },
    });
    applicationsArray = [
      ...(dbUser.applications ? dbUser.applications : []),
      applicationId,
    ];
    await manager.update(dbUser, { applications: applicationsArray });
  }

  async edit(application: EditApplicationValidation, id: string): Promise<any> {
    const dbApplication = await this.applicationRepository.findOne({
      where: { _id: { $eq: new ObjectID(id) } },
    });
    if (!dbApplication) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    const manager = this.connection.getMongoRepository(StudentApplication);
    try {
      await manager.update(dbApplication, {
        ...application,
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
      };
    }
  }

  async updateStatus(
    application: UpdateStatusValidation,
    id: string,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const datesToBeUpdated: {
      [key: string]: number;
    } = {};
    const dbApplication = await this.applicationRepository.findOne({
      where: { _id: { $eq: new ObjectID(id) } },
    });
    if (!dbApplication) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    const manager = this.connection.getMongoRepository(StudentApplication);
    for (const prop in application) {
      if (application.hasOwnProperty(prop)) {
        const propUpper = prop[0].toUpperCase() + prop.slice(1);
        datesToBeUpdated[`date${propUpper}`] = Date.now();
      }
    }
    try {
      await manager.update(dbApplication, {
        ...application,
        ...datesToBeUpdated,
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
      };
    }
  }

  async get(params: any, user: User): Promise<any> {
    let applicationQuery;
    switch (user.type) {
      case 'user':
        applicationQuery = await this.applicationRepository.find({
          where: { userId: { $eq: user.id } },
        });
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: applicationQuery,
        };
      case 'university':
        if (!user.university) {
          return {
            serviceMessage: ServiceMessages.RESPONSE_BODY,
            body: {},
          };
        }
        const manager = this.connection.getMongoRepository(University);
        const uninversityQuery = await manager.findOne({
          where: { _id: { $eq: new ObjectID(user.university) } },
        });
        const arrayQuery = uninversityQuery.landings.map((landing) => {
          return landing._id.toHexString();
        });
        applicationQuery = await this.applicationRepository.find({
          where: { 'program._id': { $in: arrayQuery } },
        });
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: applicationQuery,
        };
      default:
        applicationQuery = await this.applicationRepository.find({
          where: {
            ...this.countryQuery(params.country),
            ...this.dateQuery(params.start, params.end),
            ...this.universityQuery(params.university),
            ...this.userStatusQuery(params.userStatus),
            ...this.applicationStatusQuery(params.applicationStatus),
          },
        });
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: applicationQuery,
        };
    }
  }

  private countryQuery = (country): any => {
    if (country) {
      return {
        'program.contentProfileUniversity.nameCountry': { $eq: country },
      };
    } else {
      return {};
    }
  };

  private universityQuery = (university): any => {
    if (university) {
      return {
        'program.contentProfileUniversity.nameUniversity': { $eq: university },
      };
    } else {
      return {};
    }
  };

  private userStatusQuery = (status: UserStatus): any => {
    if (status) {
      return {
        userStatus: { $eq: status },
      };
    } else {
      return {};
    }
  };

  private applicationStatusQuery = (status: ApplicationStatus): any => {
    if (status) {
      return {
        applicationStatus: { $eq: status },
      };
    } else {
      return {};
    }
  };

  private dateQuery = (start, end): any => {
    // tslint:disable-next-line: radix
    const parsedStart = parseInt(start);
    // tslint:disable-next-line: radix
    const parsedEnd = parseInt(end);
    if (start && end) {
      return {
        startDate: { $gte: parsedStart, $lte: parsedEnd },
      };
    } else if (start) {
      return {
        startDate: { $gte: parsedStart },
      };
    } else if (end) {
      return {
        startDate: { $lte: parsedEnd },
      };
    } else {
      return {};
    }
  };

  async delete(id: any): Promise<any> {
    try {
      const applicationManager = this.connection.getMongoRepository(
        StudentApplication,
      );
      await applicationManager.findOneAndDelete({ _id: new ObjectID(id) });
      return ServiceMessages.RESPONSE_DEFAULT;
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
    }
  }
}
