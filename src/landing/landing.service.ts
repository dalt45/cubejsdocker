import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landing } from './landing.entity'
import { ServiceMessages } from '../utils/serviceResponse/ResponseDictionary';

@Injectable()
export class LandingService {
  constructor(
      @InjectRepository(Landing)
  private landingRepository: Repository<Landing>,
  ){}

  async create( landing: Landing): Promise<string>{
      try{
      await this.landingRepository.save(landing)
      } catch{
          return ServiceMessages.ERROR_DEFAULT
      }
      return ServiceMessages.RESPONSE_DEFAULT
  }

}