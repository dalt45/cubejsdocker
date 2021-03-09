import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './university.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { UniversityValidation } from './dto/university-validation.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepostory: Repository<University>,
  ) {}

  async create(university: UniversityValidation): Promise<any> {
    try {
      const universityObject = await this.universityRepostory.save(university);
      return {
        serviceMessage: ServiceMessages.RESPONSE_DEFAULT,
        body: { id: universityObject.id },
      };
    } catch {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
      };
    }
  }

  async get(Params: any): Promise<any> {
    return await this.universityRepostory.findOne(Params.id);
  }
}
