import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      msg: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
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
      case 'P2002':
        const field = (err.meta?.target as string[])?.[0] || 'field';
        res.status(409).json({
          success: false,
          msg: `A task with this ${field} already exists`,
        });
        return;

      // Invalid data type
      case 'P2006':
        res.status(400).json({
          success: false,
          msg: 'The provided value is invalid for its type',
        });
        return;

      // Required field missing
      case 'P2011':
        res.status(400).json({
          success: false,
          msg: 'Required fields are missing',
        });
        return;

      // Invalid ID format
      case 'P2023':
        res.status(400).json({
          success: false,
          msg: 'Invalid ID format',
        });
        return;

      // Record not found
      case 'P2025':
        const resource = (err.meta?.modelName as string) || 'Resource';
        res.status(404).json({
          success: false,
          msg: `${resource} not found`,
        });
        return;

      // Database connection failed
      case 'P1001':
        res.status(503).json({
          success: false,
          msg: 'Unable to connect to the database',
        });
        return;

      // Database timeout
      case 'P1008':
        res.status(504).json({
          success: false,
          msg: 'Database operation timed out',
        });
        return;

      // Database already exists
      case 'P1009':
        res.status(409).json({
          success: false,
          msg: 'Database already exists',
        });
        return;

      // Field constraints violation
      case 'P2019':
        res.status(400).json({
          success: false,
          msg: 'Input value is too long or violates field constraints',
        });
        return;

      default:
        res.status(500).json({
          success: false,
          msg: 'An unexpected database error occurred',
        });
        return;
    }
  }

  const statusCode =
    (err as CustomError).statusCode || (err as any).status || 500;

  res.status(statusCode).json({
    success: false,
    msg: err.message || 'Internal Server Error',
  });
};
