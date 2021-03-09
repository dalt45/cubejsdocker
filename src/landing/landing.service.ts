import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Landing } from './landing.entity';
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';
import { LandingValidation } from './dto/landing-validation.dto';
import { CreateLandingDto } from './dto/create-landing.dto';
import { UniversityService } from 'src/university/university.service';
import { University } from 'src/university/university.entity';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
    private readonly universityService: UniversityService,
    @InjectRepository(University)
    private universityRepostory: Repository<University>,
  ) {}

  async create(landing: CreateLandingDto): Promise<string> {
    try {
      const university = await this.universityService.get({ id: landing.id });
      this.universityRepostory.update(university, {
        landings: [...landing.landing, university.landings],
      });
    } catch {
      return ServiceMessages.ERROR_DEFAULT;
    }
    return ServiceMessages.RESPONSE_DEFAULT;
  }

  async get(Params: any): Promise<any> {
    return await this.landingRepository.findOne(Params.id);
  }
}
