import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      // Unique constraint violations
      case 'P2002': {
        const field = (err.meta?.target as string[])?.[0] || 'field';
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          errors: [{ message: `A record with this ${field} already exists` }],
        });
        return;
      }
      // Invalid data type
      case 'P2006':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'The provided value is invalid for its type',
        });
        return;

      // Required field missing
      case 'P2011':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'Required fields are missing',
        });
        return;

      // Invalid ID format
      case 'P2023':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'Invalid ID format',
        });
        return;

      // Record not found
      case 'P2025': {
        const resource = (err.meta?.modelName as string) || 'Resource';
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          msg: `${resource} not found`,
        });
        return;
      }

      // Database connection failed
      case 'P1001':
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          success: false,
          msg: 'Unable to connect to the database',
        });
        return;

      // Database timeout
      case 'P1008':
        res.status(StatusCodes.GATEWAY_TIMEOUT).json({
          success: false,
          msg: 'Database operation timed out',
        });
        return;

      // Database already exists
      case 'P1009':
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          msg: 'Database already exists',
        });
        return;

      // Field constraints violation
      case 'P2019':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'Input value is too long or violates field constraints',
        });
        return;

      // Foreign key violation
      case 'P2003':
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          msg: 'Operation violates foreign key constraint',
        });
        return;

      // Transaction failed
      case 'P2034':
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          msg: 'Transaction failed due to concurrent update',
        });
        return;

      // Value out of range
      case 'P2007':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          msg: 'Numeric value is out of range',
        });
        return;

      // Database is read-only
      case 'P1003':
        res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          msg: 'Database is in read-only mode',
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
