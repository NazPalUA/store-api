import { StatusCodes } from 'http-status-codes';
import { BaseError } from './base-error';

class NotFoundError extends BaseError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(resource: string) {
    super(`${resource} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export { NotFoundError };
