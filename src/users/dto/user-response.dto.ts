import { HttpStatus } from '@nestjs/common';

export class ResponseUserDto {
  statusCode: HttpStatus;
  message: string;
}
