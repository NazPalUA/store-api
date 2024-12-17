import { StatusCodes } from 'http-status-codes';
import { BaseError } from './base-error';

interface ValidationError {
  message: string;
  field: string;
}

class RequestValidationError extends BaseError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field: string }[] {
    return this.errors;
  }
}

export { RequestValidationError };
