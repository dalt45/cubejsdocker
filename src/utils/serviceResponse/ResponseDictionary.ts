import { response } from 'express';

export const enum httpStatusCode {
  FORBIDDEN = 403,
  CREATED = 201,
  INTERNAL = 500,
  OK = 200,
}

export interface response {
  statusCode: httpStatusCode;
  message: string;
  isError: boolean;
  hasBody: boolean;
  body: any;
}

export const enum ServiceMessages {
  RESPONSE_DEFAULT = 'RESPONSE_DEFAULT',
  ERROR_DEFAULT = 'ERROR_DEFAULT',
  USER_IS_REPEATED = 'USER_IS_REPEATED',
}

export const Dictionary: { [value in ServiceMessages]: response } = {
  RESPONSE_DEFAULT: {
    statusCode: httpStatusCode.OK,
    message: 'Success',
    isError: false,
    hasBody: false,
    body: {},
  },
  ERROR_DEFAULT: {
    statusCode: httpStatusCode.INTERNAL,
    message: 'Internal server error',
    isError: true,
    hasBody: false,
    body: {},
  },
  USER_IS_REPEATED: {
    statusCode: httpStatusCode.FORBIDDEN,
    message: 'User is Repeated',
    isError: true,
    hasBody: false,
    body: {},
  },
};
