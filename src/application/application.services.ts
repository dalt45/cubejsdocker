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

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(StudentApplication)
    private applicationRepository: Repository<StudentApplication>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async create(application: ApplicationValidation, user: User): Promise<any> {
    try {
      const newApplication = await this.applicationRepository.save({
        ...application,
        userId: user.id,
      });
      this.updateUserWithApplication(user, newApplication.id);
      // this.updateUserWithApplication(application.programId, newApplication.id);
      return ServiceMessages.RESPONSE_DEFAULT;
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
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
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    try {
      await this.applicationRepository.update(dbApplication, {
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
          where: { programId: { $in: arrayQuery } },
        });
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: applicationQuery,
        };
      default:
        applicationQuery = await this.applicationRepository.find({});
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: applicationQuery,
        };
    }
  }
}
