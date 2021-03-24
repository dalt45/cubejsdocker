import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landing } from './landing.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { LandingValidation } from './dto/landing-validation.dto';
import { CreateLandingDto } from './dto/create-landing.dto';
import { UniversityService } from 'src/university/university.service';
import { University } from 'src/university/university.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class LandingService {
  constructor(
    private readonly universityService: UniversityService,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async create(landing: CreateLandingDto): Promise<string> {
    try {
      const university = await this.universityService.get({ id: landing.id });
      this.universityRepository.update(university, {
        landings: [...landing.landing, ...university.landings],
      });
      return ServiceMessages.RESPONSE_DEFAULT;
    } catch (e) {
      return ServiceMessages.ERROR_DEFAULT;
    }
  }

  async get(Params: any): Promise<any> {
    const university = await this.universityRepository.find({
      where: {
        'landings._id': { $eq: new ObjectID(Params.id) },
      },
    });
    return {
      serviceMessage: ServiceMessages.RESPONSE_BODY,
      body: university[0].landings.map((landing) => {
        if (landing._id.equals(Params.id)) return landing;
      })[0],
    };
  }
}
