import { StatusCodes } from 'http-status-codes';
import { BaseError } from './base-error';

class ConflictError extends BaseError {
  statusCode = StatusCodes.CONFLICT;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export { ConflictError };
