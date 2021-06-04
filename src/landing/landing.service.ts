import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landing } from './landing.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { LandingValidation } from './dto/landing-validation.dto';
import { CreateLandingDto } from './dto/create-landing.dto';
import { University } from '../university/university.entity';
import { ObjectID } from 'mongodb';
import { User } from 'src/users/user.entity';
import { Campus } from 'src/campus/campus.entity';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async create(landing: CreateLandingDto, user: User): Promise<any> {
    try {
      const university = await this.universityRepository.findOne({
        where: {
          'campus.fields._id': { $eq: new ObjectID(landing.fieldId) },
        },
      });
      if (!university) {
        return {
          serviceMessage: ServiceMessages.NOT_FOUND,
          body: {},
        };
      }
      const newLanding = new Landing(landing.landing);
      newLanding.createdBy = user.id;
      const campusArray = university.campus;
      university.campus.forEach((campus, indexCampus) => {
        campus.fields.forEach((field, indexField) => {
          if (field._id.equals(landing.fieldId)) {
            campusArray[indexCampus].fields[indexField].landings.push(
              newLanding,
            );
          }
        });
      });

      const universityToModify = await this.universityRepository.findOne({
        where: {
          'campus.fields._id': { $eq: new ObjectID(landing.fieldId) },
        },
      });
      await this.universityRepository.update(universityToModify, {
        campus: [...campusArray],
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: newLanding,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
        body: {},
      };
    }
  }

  async get(Params: any): Promise<any> {
    const university = await this.universityRepository.findOne({
      where: {
        'campus.fields.landings._id': { $eq: new ObjectID(Params.id) },
      },
    });
    if (!university) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
        body: {},
      };
    }
    if (Params.university === '') {
      const result = university;
      university.campus.forEach((campus) => {
        campus.fields.forEach((field) => {
          field.landings.forEach((landing) => {
            if (landing._id.equals(Params.id)) {
              result.campus = [campus];
              result.campus[0].fields = [field];
              result.campus[0].fields[0].landings = [landing];
            }
          });
        });
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: result,
      };
    }
    let resultLanding: Landing;
    university.campus.forEach((campus) => {
      campus.fields.forEach((field) => {
        field.landings.forEach((landing) => {
          if (landing._id.equals(Params.id)) {
            resultLanding = landing;
          }
        });
      });
    });
    if (resultLanding) {
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: resultLanding,
      };
    } else {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
        body: {},
      };
    }
  }

  async edit(id: string, landingModify: LandingValidation): Promise<any> {
    const university = await this.universityRepository.findOne({
      where: {
        'campus.fields.landings._id': { $eq: new ObjectID(id) },
      },
    });
    if (!university) {
      return ServiceMessages.NOT_FOUND;
    }
    const campusArray = university.campus;
    campusArray.forEach((campus, indexCampus) => {
      campus.fields.forEach((field, indexField) => {
        field.landings.forEach((landing, indexLanding) => {
          if (landing._id.equals(id)) {
            campusArray[indexCampus].fields[indexField].landings[
              indexLanding
            ] = {
              ...campusArray[indexCampus].fields[indexField].landings[
                indexLanding
              ],
              ...landingModify,
            };
          }
        });
      });
    });

    try {
      const universityToModify = await this.universityRepository.findOne({
        where: {
          'campus.fields.landings._id': { $eq: new ObjectID(id) },
        },
      });
      await this.universityRepository.update(universityToModify, {
        campus: [...campusArray],
      });
      return ServiceMessages.RESPONSE_DEFAULT;
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
    }
  }
}
