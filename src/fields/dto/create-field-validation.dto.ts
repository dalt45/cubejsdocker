import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjectID } from 'mongodb';
import { Field } from '../fields.entity';
import { FieldValidation } from './field-validation.dto';

export class CreateFieldDto {
  @IsNotEmpty()
  @IsMongoId()
  campusId: ObjectID;

  @ValidateNested()
  @Type(() => FieldValidation)
  field: Field;
}
