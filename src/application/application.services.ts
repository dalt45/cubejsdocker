import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ServiceMessages } from 'src/utils/serviceResponse/ResponseDictionary';
import { Repository, Connection } from 'typeorm';
import { StudentApplication } from './application.entity';
import { ApplicationValidation } from './documents/validation-application.dto';
import { ObjectID } from 'mongodb';
import { EditApplicationValidation } from './documents/validation-application-edit.dto';

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
      const newApplication = await this.applicationRepository.save(application);
      this.updateUserWithApplication(user, newApplication.id);
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
}
