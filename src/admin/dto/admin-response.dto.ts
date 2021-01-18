import { HttpStatus } from '@nestjs/common';

export class ResponseAdminDto {
  statusCode: HttpStatus;
  message: string;
}
