import { ServiceMessages } from '../serviceResponse/ResponseDictionary';
import ServiceResponse from '../serviceResponse/ServiceResponse';

export const enum CatchEnum {
  find = 'find',
  update = 'update',
}

class CatchResponse {
  shouldReturn: boolean;
  serviceResponse: ServiceMessages;
  result: any = null;
  constructor({ shouldReturn, serviceResponse, result }) {
    this.serviceResponse = serviceResponse;
    this.shouldReturn = shouldReturn;
    this.result = result;
  }
  returnValue() {
    if (!this.shouldReturn) {
      return this.result;
    } else {
      return {
        serviceMessage: this.serviceResponse,
        body: {},
      };
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class OperationCatcher {
  catchType: CatchEnum;
  result: Promise<CatchResponse>;

  constructor(functionToCatch, catchType: CatchEnum) {
    this.catchType = catchType;
    if (catchType === 'find') {
      this.result = this.catchFind(functionToCatch);
    }
    if (catchType === 'update') {
      this.result = this.catchUpdate(functionToCatch);
    }
  }

  async catchFind(functionToCatch: any): Promise<CatchResponse> {
    try {
      const result = await functionToCatch();
      if (!result) {
        const response = new CatchResponse({
          shouldReturn: true,
          serviceResponse: ServiceMessages.NOT_FOUND,
          result: null,
        });
        return response;
      } else {
        const response = new CatchResponse({
          shouldReturn: false,
          serviceResponse: ServiceMessages.NOT_FOUND,
          result,
        });
        return response;
      }
    } catch (e) {
      const response = new CatchResponse({
        shouldReturn: true,
        serviceResponse: ServiceMessages.BAD_REQUEST,
        result: null,
      });
      return response;
    }
  }

  async catchUpdate(functionToCatch: any): Promise<any> {
    try {
      const result = await functionToCatch();
      return result;
    } catch (e) {
      return;
    }
  }
}
