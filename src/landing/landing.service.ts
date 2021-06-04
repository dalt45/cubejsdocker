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

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async create(landing: CreateLandingDto, user: User): Promise<any> {
    try {
      const university = await this.universityRepository.findOne(
        (landing.id as unknown) as string,
      );
      const newLandingArray = landing.landing.map((item) => {
        item.createdBy = user.id;
        return new Landing(item);
      });
      await this.universityRepository.update(university, {
        landings: [...newLandingArray, ...university.landings],
      });
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: newLandingArray.map((item) => ({
          id: item._id,
        })),
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
        'landings._id': { $eq: new ObjectID(Params.id) },
      },
    });
    if (university.length === 0) {
      return {
        serviceMessage: ServiceMessages.NOT_FOUND,
      };
    }
    let resultLanding: Landing;
    university[0].landings.forEach((landing) => {
      if (landing._id.equals(Params.id)) resultLanding = landing;
    });
    if (resultLanding) {
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: resultLanding,
      };
    }
  }

  async edit(id: string, landing: LandingValidation): Promise<any> {
    const university = await this.universityRepository.findOne({
      where: {
        'landings._id': { $eq: new ObjectID(id) },
      },
    });
    if (!university) {
      return ServiceMessages.NOT_FOUND;
    }
    const landingArray = university.landings;
    for (const element in landingArray) {
      if (landingArray[element]._id.equals(id)) {
        const toModify = landingArray[element];
        for (const values in landing) {
          if (toModify.hasOwnProperty(values))
            toModify[values] = landing[values];
        }
        // tslint:disable-next-line: radix
        landingArray.splice((element as unknown) as number, 1, toModify);
      }
    }
    try {
      const universityToModify = await this.universityRepository.findOne({
        where: {
          'landings._id': { $eq: new ObjectID(id) },
        },
      });
      await this.universityRepository.update(universityToModify, {
        landings: [...landingArray],
      });
      return ServiceMessages.RESPONSE_DEFAULT;
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
    }
  }
}
