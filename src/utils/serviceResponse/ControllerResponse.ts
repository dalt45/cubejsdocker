import { response } from './ResponseDictionary';
import { HttpException } from '@nestjs/common';

export default class ControllerResponse {
  serviceResponse: response;
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

  httpSuccess() {
    return this.serviceResponse;
  }
}
