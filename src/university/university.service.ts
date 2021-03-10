import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './university.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { UniversityValidation } from './dto/university-validation.dto';
import { Landing } from 'src/landing/landing.entity';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepostory: Repository<University>,
  ) {}

  async create(university: UniversityValidation): Promise<any> {
    try {
      const landingsArray = [];
      university.landings.forEach((landing) => {
        const newLanding: Landing = new Landing(landing);
        landingsArray.push(newLanding);
      });
      university.landings = landingsArray;
      const universityObject = await this.universityRepostory.save(university);
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: { id: universityObject.id },
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.BAD_REQUEST,
      };
    }
  }

  async get(Params: any): Promise<any> {
    return await this.universityRepostory.findOne(Params.id);
  }
}
