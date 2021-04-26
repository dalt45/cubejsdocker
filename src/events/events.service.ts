import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceMessages } from 'src/utils/serviceResponse/ResponseDictionary';
import { Repository } from 'typeorm';
import { EventValidation } from './dto/event-validation.dto';
import { ApplicationEvent } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(ApplicationEvent)
    private eventRepository: Repository<ApplicationEvent>,
  ) {}

  async createEvent(event: EventValidation): Promise<any> {
    try {
      const eventCreated = await this.eventRepository.save(event);
      return {
        serviceMessage: ServiceMessages.RESPONSE_BODY,
        body: { ...eventCreated },
      };
    } catch (e) {
      return {
        serviceMessage: ServiceMessages.ERROR_DEFAULT,
        body: {},
      };
    }
  }
}
