import { HttpException } from '@nestjs/common';
import { Dictionary, Response } from './ResponseDictionary';

export default class ServiceResponse {
  serviceResponse: Response;
  responseJSON: { [key: string]: any };
  constructor(serviceMessage = 'DEFAULT') {
    this.serviceResponse = Dictionary[serviceMessage];
  }

  setBody(body: { [key: string]: any }) {
    if (this.serviceResponse.hasBody) {
      this.serviceResponse.body = body;
    }
    return this;
  }

  getResponse() {
    const responseObject: { [key: string]: any } = {};
    if (this.serviceResponse.hasBody) {
      responseObject.body = this.serviceResponse.body;
    }
    responseObject.statusCode = this.serviceResponse.statusCode;
    responseObject.message = this.serviceResponse.message;
    return responseObject;
  }

  getJSON() {
    const responseJSON: { [key: string]: any } = {};
    if (this.serviceResponse.hasBody) {
      responseJSON.body = this.serviceResponse.body;
    }
    responseJSON.statusCode = this.serviceResponse.statusCode;
    responseJSON.message = this.serviceResponse.message;
    this.responseJSON = responseJSON;
    return this;
  }

  isError() {
    return this.serviceResponse.isError;
  }

  httpError() {
    throw new HttpException(
      {
        status: this.responseJSON.statusCode,
        error: this.responseJSON.message,
        ...this.responseJSON.body,
      },
      this.responseJSON.statusCode,
    );
  }

  mockError() {
    return {
      status: this.responseJSON.statusCode,
      error: this.responseJSON.message,
      ...this.responseJSON.body,
    };
  }

  httpSuccess() {
    return this.responseJSON;
  }

  getControllerResponse() {
    if (this.isError()) return this.httpError();
    return this.httpSuccess();
  }
}
