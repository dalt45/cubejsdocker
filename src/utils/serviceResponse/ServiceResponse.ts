import { Any } from 'typeorm';
import { Dictionary, response } from './ResponseDictionary';

export default class ServiceResponse {
  serviceResponse: response;
  serviceMessage: string;
  constructor(serviceMessage = 'DEFAULT') {
    this.serviceMessage = serviceMessage;
    this.serviceResponse = Dictionary[this.serviceMessage];
  }

  setBody(body: { [key: string]: any }) {
    if (this.serviceResponse.hasBody) {
      this.serviceResponse.body = body;
    }
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

  isError() {
    return this.serviceResponse.isError;
  }
}
