import { Body, Controller, Post } from '@nestjs/common';
import ServiceResponse from 'src/utils/serviceResponse/ServiceResponse';
import { EventValidation } from './dto/event-validation.dto';
import { EventsService } from './events.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  async emitEvent(@Body() event: EventValidation): Promise<any> {
    const response = await this.eventService.createEvent(event);
    return new ServiceResponse(response.serviceMessage)
      .setBody(response.body)
      .getJSON()
      .getControllerResponse();
  }
}
