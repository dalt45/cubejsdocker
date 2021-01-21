import { response } from 'express';

export const enum httpStatusCode {
  FORBIDDEN = 403,
  CREATED = 201,
  INTERNAL = 500,
  OK = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
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
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
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
  UNAUTHORIZED: {
    statusCode: httpStatusCode.UNAUTHORIZED,
    message: 'Unauthorized',
    isError: true,
    hasBody: false,
    body: {},
  },
  BAD_REQUEST: {
    statusCode: httpStatusCode.BAD_REQUEST,
    message: 'Bad Request',
    isError: true,
    hasBody: false,
    body: {},
  },
};
