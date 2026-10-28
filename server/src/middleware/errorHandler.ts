import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'कुछ गलत हो गया';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.isOperational ? err.message : 'कुछ गलत हो गया'
    });
  }
};
