import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Landing } from './landing.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { LandingValidation } from './dto/landing-validation.dto';
import { CreateLandingDto } from './dto/create-landing.dto';
import { University } from '../university/university.entity';
import { ObjectID } from 'mongodb';
import { User } from 'src/users/user.entity';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
    private connection: Connection,
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

  async getSearchUniversities(params: any): Promise<any> {
    const queryBuild = {};
    let secondQuery = {};
    Object.keys(params).forEach((param) => {
      switch (param) {
        case 'courseType':
          secondQuery = {
            ...secondQuery,
            ...{
              'campus.fields.landings.contentProfileCourse.courseType': {
                $regex: params[param],
                $options: 'i',
              },
            },
          };
          break;
        case 'area':
          secondQuery = {
            ...secondQuery,
            ...{
              'campus.fields.name': {
                $regex: params[param],
                $options: 'i',
              },
            },
          };
          break;
        case 'institutionType':
          secondQuery = {
            ...secondQuery,
            ...{
              'contentProfileUniversity.type': {
                $regex: params[param],
                $options: 'i',
              },
            },
          };
        case 'dateMonth':
          secondQuery = {
            ...secondQuery,
            ...{
              'campus.fields.landings.contentProfileCourse.startDates.month': {
                $in: [params[param]],
              },
            },
          };
          break;
        case 'dateYear':
          secondQuery = {
            ...secondQuery,
            ...{
              'campus.fields.landings.contentProfileCourse.startDates.year': {
                $in: [params[param]],
              },
            },
          };
          break;
        case 'duration':
          secondQuery = {
            ...secondQuery,
            ...{
              'campus.fields.landings.contentProfileCourse.duration': {
                $regex: params[param],
                $options: 'i',
              },
            },
          };
          break;
        case 'search':
          secondQuery = {
            ...secondQuery,
            ...{
              $or: [
                {
                  'contentProfileUniversity.name': {
                    $regex: params[param],
                    $options: 'i',
                  },
                },
                {
                  'campus.contentProfileCampus.nameCity': {
                    $regex: params[param],
                    $options: 'i',
                  },
                },
                {
                  'campus.fields.landings.contentProfileCourse.name': {
                    $regex: params[param],
                    $options: 'i',
                  },
                },
              ],
            },
          };
          break;
      }
    });
    const manager = this.connection.getMongoRepository(University);
    const university = await manager.aggregate([
      { $match: { ...queryBuild } },
      { $unwind: '$campus' },
      { $unwind: '$campus.fields' },
      { $unwind: '$campus.fields.landings' },
      { $match: { ...secondQuery } },
      {
        $group: {
          _id: '$campus.fields.landings._id',
          course: {
            $first: '$campus.fields.landings',
          },
          area: {
            $first: { name: '$campus.fields.name' },
          },
          campus: {
            $first: {
              contentProfileCampus: '$campus.contentProfileCampus',
              images: '$campus.images',
            },
          },
          university: {
            $first: {
              contentProfileUniversity: '$contentProfileUniversity',
              images: '$images',
            },
          },
        },
      },
    ]);
    const result = await university.toArray();
    return {
      serviceMessage: ServiceMessages.RESPONSE_BODY,
      body: result,
    };
  }

  async getSearchOptions(): Promise<any> {
    const manager = this.connection.getMongoRepository(University);
    const university = await manager.aggregate([
      { $unwind: '$campus' },
      { $unwind: '$campus.fields' },
      { $unwind: '$campus.fields.landings' },
      {
        $group: {
          _id: 'options',
          courseType: {
            $addToSet:
              '$campus.fields.landings.contentProfileCourse.courseType',
          },
          area: {
            $addToSet: '$campus.fields.name',
          },
          country: {
            $addToSet: '$campus.contentProfileCampus.nameCountry',
          },
          dateYear: {
            $addToSet: {
              $first:
                '$campus.fields.landings.contentProfileCourse.startDates.year',
            },
          },
          dateMonth: {
            $addToSet: {
              $first:
                '$campus.fields.landings.contentProfileCourse.startDates.month',
            },
          },
          institutionType: {
            $addToSet: {
              $first: '$contentProfileUniversity.type',
            },
          },
          duration: {
            $addToSet: '$campus.fields.landings.contentProfileCourse.duration',
          },
        },
      },
    ]);
    const result = await university.toArray();
    return {
      serviceMessage: ServiceMessages.RESPONSE_BODY,
      body: result,
    };
  }

  async get(Params: any): Promise<any> {
    if (!Params.id) {
      return this.getSearchUniversities(Params);
    }
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
              result.campus[0].fields[0].landings = [landing].concat(
                field.landings,
              );
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
