import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EventBI } from '../enums/event.enum';
import { EventKey } from '../enums/evetKey.enum';

export class EventValidation {
  @IsNumber()
  @IsNotEmpty()
  timeStamp: string;

  @IsEnum(EventBI)
  @IsNotEmpty()
  event: EventBI;

  @IsEnum(EventKey)
  @IsNotEmpty()
  eventKey: EventKey;

  @IsString()
  @IsNotEmpty()
  value: string;
}
