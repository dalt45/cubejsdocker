import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { University } from '../university/university.entity';
import { ObjectID } from 'mongodb';
import { User } from 'src/users/user.entity';
import { CreateFieldDto } from './dto/create-field-validation.dto';
import { Field } from './fields.entity';
import { FieldValidation } from './dto/field-validation.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async create(fieldCreate: CreateFieldDto, user: User): Promise<any> {
    const university = await this.universityRepository.findOne({
      where: {
        'campus._id': { $eq: new ObjectID(fieldCreate.campusId) },
      },
    });
    if (!university) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
        body: {},
      };
    }
    const newField = new Field(fieldCreate.field);
    newField.createdBy = user.id;

    const campusArray = university.campus;
    for (const element in campusArray) {
      if (
        campusArray[element]._id &&
        campusArray[element]._id.equals(fieldCreate.campusId)
      ) {
        const toModify = campusArray[element];
        toModify.fields = [...toModify.fields, newField];
        campusArray.splice((element as unknown) as number, 1, toModify);
        break;
      }
    }

    try {
      const universityToModify = await this.universityRepository.findOne({
        where: {
          'campus._id': { $eq: new ObjectID(fieldCreate.campusId) },
        },
      });
      await this.universityRepository.update(universityToModify, {
        campus: [...campusArray],
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: newField,
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
        'campus.fields._id': { $eq: new ObjectID(Params.id) },
      },
    });
    if (university.length === 0) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    let resultField: Field;
    university[0].campus.forEach((campus) => {
      campus.fields.forEach((field) => {
        if (field._id.equals(Params.id)) resultField = field;
      });
    });
    if (resultField) {
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: resultField,
      };
    } else {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
        body: {},
      };
    }
  }

  async edit(id: string, fieldModify: FieldValidation): Promise<any> {
    const university = await this.universityRepository.findOne({
      where: {
        'campus.fields._id': { $eq: new ObjectID(id) },
      },
    });
    if (!university) {
      return ServiceMessages.NOT_FOUND;
    }
    const campusArray = university.campus;
    campusArray.forEach((campus, indexCampus) => {
      campus.fields.forEach((field, indexField) => {
        if (field._id.equals(id)) {
          campusArray[indexCampus].fields[indexField] = {
            ...field,
            ...fieldModify,
          };
        }
      });
    });

    try {
      const universityToModify = await this.universityRepository.findOne({
        where: {
          'campus.fields._id': { $eq: new ObjectID(id) },
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
