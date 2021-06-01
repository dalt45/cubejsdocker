import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { University } from './university.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { UniversityValidation } from './dto/university-validation.dto';
import { User } from '../users/user.entity';
import { ObjectID } from 'mongodb';
import { validate } from 'class-validator';
import { mergeObject } from 'src/utils/merge';
import * as cloudinary from 'cloudinary';

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
      const newUniversity = new University(university);
      newUniversity.createdBy = userInfo.id;
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
      if (!Params.id) {
        const results = await this.universityRepostory.find();
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: results,
        };
      } else {
        const university = await this.universityRepostory.findOne(Params.id);
        if (!university) {
          return {
            serviceMessage: ServiceMessages.NOT_FOUND,
          };
        }
        return {
          serviceMessage: ServiceMessages.RESPONSE_BODY,
          body: university,
        };
      }
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
      };
    }
  }

  async edit(university: UniversityValidation, params, userInfo): Promise<any> {
    const updatedUniversity = new UniversityValidation();
    const manager = this.connection.getMongoRepository(User);
    const dbUser = await manager.findOne({
      where: { _id: { $eq: new ObjectID(userInfo.id) } },
    });
    const universityToEdit = dbUser?.university ? dbUser.university : params.id;
    if (!universityToEdit) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
    if (university) {
      const universityQuery = await this.universityRepostory.findOne(
        universityToEdit,
      );
      await Promise.all(
        Object.keys(university).map(async (value) => {
          if (value === 'images') {
            const newObject = mergeObject(
              universityQuery[value],
              university[value],
            );
            updatedUniversity.images = await this.updateImages(newObject);
          } else {
            updatedUniversity[value] = {
              ...universityQuery[value],
              ...university[value],
            };
          }
        }),
      );

      try {
        const universityBefore = await this.universityRepostory.findOne(
          universityToEdit,
        );
        this.universityRepostory.update(universityBefore, {
          ...updatedUniversity,
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

  async deleteImage(id: string, url: string) {
    const university = await this.universityRepostory.findOne(id);
    if (!university) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    const universityToDel = university;
    Object.keys(universityToDel.images).forEach((type) => {
      if (
        universityToDel.images[type] instanceof Object &&
        universityToDel.images[type] instanceof Array
      ) {
        universityToDel.images[type].map(async (document, index) => {
          if (document.url === url)
            universityToDel.images[type].splice(index, 1);
        });
      } else if (universityToDel.images[type] instanceof Object) {
        if (universityToDel.images[type].url === url) {
          universityToDel.images[type].url = '';
        }
      }
    });
    try {
      const universityBefore = await this.universityRepostory.findOne(id);
      this.universityRepostory.update(universityBefore, {
        ...universityToDel,
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
