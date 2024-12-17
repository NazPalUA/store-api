import { StatusCodes } from 'http-status-codes';
import { BaseError } from './base-error';

class UnauthorizedError extends BaseError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string = 'Unauthorized access') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export { UnauthorizedError };
