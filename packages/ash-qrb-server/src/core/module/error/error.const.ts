export const NOT_FOUND = 'not_found'
export const BAD_REQUEST = 'bad_request'
export const FORBIDDEN = 'forbidden'
export const UNAUTHORIZED = 'unauthorized'
export const CONFLICT = 'conflict'
export const INTERNAL = 'internal'

export type TApiErrorName =
  | 'not_found'
  | 'db_error'
  | 'bad_request'
  | 'forbidden'
  | 'unauthorized'
  | 'conflict'
  | 'internal'

export interface IApiError {
  name: TApiErrorName
  message: string
}

export const ERROR_NOT_FOUND: IApiError = {
  name: NOT_FOUND,
  message: 'Not found',
}

export const ERROR_DB_TRANSACTION: IApiError = {
  name: 'db_error',
  message: 'Error DB TRANSACTION',
}

export const ERROR_FORBIDDEN: IApiError = {
  name: FORBIDDEN,
  message: 'Access denied',
}

export const ERROR_BAD_REQUEST: IApiError = {
  name: BAD_REQUEST,
  message: 'Bad request',
}

export const ERROR_UNAUTHORIZED: IApiError = {
  name: UNAUTHORIZED,
  message: 'Unauthorized. Sign in api request [/api/auth/sign-in]',
}

export const ERROR_CONFLICT: IApiError = {
  name: CONFLICT,
  message: 'Current record is already exists',
}

export const ERROR_INTERNAL: IApiError = {
  name: INTERNAL,
  message: 'Internal Server Error',
}
