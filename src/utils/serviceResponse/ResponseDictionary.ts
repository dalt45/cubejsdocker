export const enum httpStatusCode {
  FORBIDDEN = 403,
  CREATED = 201,
  INTERNAL = 500,
  OK = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export interface Response {
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
  RESPONSE_BODY = 'RESPONSE_BODY',
}

export const Dictionary: { [value in ServiceMessages]: Response } = {
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
    statusCode: httpStatusCode.BAD_REQUEST,
    message: 'Bad Request',
    isError: true,
    hasBody: true,
    body: { message: 'User is repeated' },
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
    hasBody: true,
    body: {},
  },
  RESPONSE_BODY: {
    statusCode: httpStatusCode.OK,
    message: 'Success',
    isError: false,
    hasBody: true,
    body: {},
  },
};
