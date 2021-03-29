import { IsEmpty, IsOptional, IsPostalCode } from 'class-validator';
import { ApplicationValidation } from './validation-application.dto';
import { ObjectID } from 'mongodb';

export class EditApplicationValidation extends ApplicationValidation {
  @IsEmpty()
  programId: ObjectID;
  constructor() {
    super();
  }
}
