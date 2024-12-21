import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongoError } from 'mongodb';
import { ZodError } from 'zod';
import { BaseError } from '../errors';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      errors: err.serializeErrors(),
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      errors: err.errors.map(error => ({
        path: error.path,
        message: error.message,
      })),
    });
    return;
  }

  if (err instanceof MongoError) {
    switch (err.code) {
      case 11000:
        const field = Object.keys((err as any).keyPattern)[0] || 'field';
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          errors: [{ message: `A record with this ${field} already exists` }],
        });
        return;

      case 51:
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'Invalid ID format',
        });
        return;

      case 112:
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          msg: 'Write conflict occurred, please try again',
        });
        return;

      case 8000:
      case 6:
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          success: false,
          msg: 'Unable to connect to the database',
        });
        return;

      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          msg: 'An unexpected database error occurred',
        });
        return;
    }
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    errors: [{ message: 'Internal Server Error' }],
  });
};
