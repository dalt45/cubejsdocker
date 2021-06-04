import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { University } from './university.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { UniversityValidation } from './dto/university-validation.dto';
import { User } from '../users/user.entity';
import { ObjectID } from 'mongodb';
import { validate } from 'class-validator';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepostory: Repository<University>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async create(university: UniversityValidation, userInfo: User): Promise<any> {
    const manager = this.connection.getMongoRepository(User);
    const dbUser = await manager.findOne({
      where: { _id: { $eq: new ObjectID(userInfo.id) } },
    });
    if (dbUser && dbUser.university) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    try {
      await validate(university, {
        whitelist: true,
      });
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    try {
      const newUniversity = new University();
      newUniversity.createdBy = userInfo.id;
      newUniversity.contentProfileUniversity =
        university.contentProfileUniversity;
      newUniversity.campus = [];
      newUniversity.images = university.images;
      await this.universityRepostory.save(newUniversity);
      if (dbUser)
        manager.update(dbUser, {
          university: newUniversity.id,
        });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: { id: newUniversity.id },
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
  }

  async get(Params: any): Promise<any> {
    try {
      const university = await this.universityRepostory.findOne(Params.id);
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: university,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
      };
    }
  }

  async edit(university, params, userInfo): Promise<any> {
    const manager = this.connection.getMongoRepository(User);
    const dbUser = await manager.findOne({
      where: { _id: { $eq: new ObjectID(userInfo.id) } },
    });
    const universityToEdit = dbUser.university ? dbUser.university : params.id;
    if (!universityToEdit) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    const universityQuery = await this.universityRepostory.findOne(
      universityToEdit,
    );
    try {
      delete university.landings;
      this.universityRepostory.update(universityQuery, { ...university });
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
