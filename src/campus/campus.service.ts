import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campus } from './campus.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { University } from '../university/university.entity';
import { ObjectID } from 'mongodb';
import { User } from 'src/users/user.entity';
import { CampusValidation } from './dto/campus-validation.dto';
import { CreateCampusDto } from './dto/create-campus-validation.dto';
import * as cloudinary from 'cloudinary';
import { validate } from 'class-validator';
import { mergeObject } from 'src/utils/merge';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async create(campus: CreateCampusDto, user: User): Promise<any> {
    try {
      const university = await this.universityRepository.findOne(
        (campus.universityId as unknown) as string,
      );
      const newCampus = new Campus(campus.campus);
      newCampus.createdBy = user.id;

      await this.universityRepository.update(university, {
        campus: [...university.campus, newCampus],
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: newCampus,
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
        body: {},
      };
    }
  }

  async get(Params: any): Promise<any> {
    const university = await this.universityRepository.find({
      where: {
        'campus._id': { $eq: new ObjectID(Params.id) },
      },
    });
    if (university.length === 0) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    let resultLanding: Campus;
    university[0].campus.forEach((campus) => {
      if (campus._id && campus._id.equals(Params.id)) resultLanding = campus;
    });
    if (resultLanding) {
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: resultLanding,
      };
    }
  }

  async edit(id: string, campus: CampusValidation): Promise<any> {
    try {
      await validate(campus, {
        whitelist: true,
      });
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    const university = await this.universityRepository.findOne({
      where: {
        'campus._id': { $eq: new ObjectID(id) },
      },
    });
    if (!university) {
      return ServiceMessages.NOT_FOUND;
    }
    const campusArray = university.campus;
    for (const element in campusArray) {
      if (campusArray[element]._id && campusArray[element]._id.equals(id)) {
        const toModify = campusArray[element];
        for (const values in campus) {
          if (values === 'images') {
            const newObject = mergeObject(toModify[values], campus[values]);
            toModify[values] = await this.updateImages(newObject);
          } else {
            if (toModify.hasOwnProperty(values))
              toModify[values] = campus[values];
          }
        }
        // tslint:disable-next-line: radix
        campusArray.splice((element as unknown) as number, 1, toModify);
      }
    }
    try {
      const universityToModify = await this.universityRepository.findOne({
        where: {
          'campus._id': { $eq: new ObjectID(id) },
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

  async deleteImage(id: string, url: string) {
    const university = await this.universityRepository.findOne({
      where: {
        'campus._id': { $eq: new ObjectID(id) },
      },
    });
    if (!university) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    const campusArray = university.campus;
    for (const element in campusArray) {
      if (campusArray[element]._id && campusArray[element]._id.equals(id)) {
        const toDelete = campusArray[element].images;
        Object.keys(campusArray[element].images).forEach((type) => {
          if (
            campusArray[element].images[type] instanceof Object &&
            campusArray[element].images[type] instanceof Array
          ) {
            campusArray[element].images[type].map(async (document, index) => {
              if (document.url === url) toDelete[type].splice(index, 1);
            });
          } else if (campusArray[element].images[type] instanceof Object) {
            if (campusArray[element].images[type].url === url) {
              toDelete[type].url = '';
            }
          }
        });
        try {
          const universityToModify = await this.universityRepository.findOne({
            where: {
              'campus._id': { $eq: new ObjectID(id) },
            },
          });
          campusArray[element].images = toDelete;
          await this.universityRepository.update(universityToModify, {
            campus: [...campusArray],
          });
          return { serviceMessage: ServiceMessages.RESPONSE_DEFAULT };
        } catch (e) {
          return { ServiceMessage: ServiceMessages.ERROR_DEFAULT };
        }
      }
    }
  }

  async updateImages(images: any): Promise<any> {
    const formatedDocuments = images;
    try {
      await Promise.all(
        Object.keys(images).map(async (type) => {
          if (images[type] instanceof Object && images[type] instanceof Array) {
            return Promise.all(
              images[type].map(async (document, index) => {
                if (document.file) {
                  const url = await this.uploadDocument(document.file);
                  formatedDocuments[type][index].url = url;
                  delete formatedDocuments[type][index].file;
                  return url;
                }
              }),
            );
          } else if (images[type] instanceof Object) {
            if (images[type].file) {
              const url = await this.uploadDocument(images[type].file);
              formatedDocuments[type].url = url;
              delete formatedDocuments[type].file;
              return url;
            }
          }
        }),
      );
      return formatedDocuments;
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadDocument(base64String: string): Promise<string> {
    let url: string;
    cloudinary.v2.config({
      cloud_name: 'dp1c1cwfa',
      api_key: '115896989882796',
      api_secret: 'IRUfD9u7i6b7ioeW7E6lM6uDadA',
    });
    await cloudinary.v2.uploader.upload(
      'data:image/png;base64,' + base64String,
      { resource_type: 'auto', folder: 'be-international/images/' },
      async (error, result) => {
        if (error) {
          throw new Error('Upload Failed');
        } else {
          url = result.secure_url;
        }
      },
    );
    return url;
  }
}
