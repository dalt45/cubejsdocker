import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Landing } from './landing.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { LandingValidation } from './dto/landing-validation.dto';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
  ) {}

  async create(landing: LandingValidation): Promise<string> {
    try {
      await this.landingRepository.save(landing);
    } catch {
      return ServiceMessages.ERROR_DEFAULT;
    }
    return ServiceMessages.RESPONSE_DEFAULT;
  }

  async get(Params: any): Promise<any> {
    return await this.landingRepository.findOne(Params.id);
  }
}
