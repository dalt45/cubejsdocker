import { Response } from './ResponseDictionary';
import { HttpException } from '@nestjs/common';

export default class ControllerResponse {
  serviceResponse: Response;
  constructor(serviceResponse) {
    this.serviceResponse = serviceResponse;
  }

  httpError() {
    throw new HttpException(
      {
        status: this.serviceResponse.statusCode,
        error: this.serviceResponse.message,
      },
      this.serviceResponse.statusCode,
    );
  }

  mockError() {
    return {
      status: this.serviceResponse.statusCode,
      error: this.serviceResponse.message,
    };
  }

  httpSuccess() {
    return this.serviceResponse;
  }
}
