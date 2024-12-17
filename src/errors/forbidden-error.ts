import { StatusCodes } from 'http-status-codes';
import { BaseError } from './base-error';

class ForbiddenError extends BaseError {
  statusCode = StatusCodes.FORBIDDEN;

  constructor(message: string = 'Access forbidden') {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export { ForbiddenError };
