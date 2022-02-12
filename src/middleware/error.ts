import { ErrorResponse } from '../utils/ErrorResponse';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  if (error.code === 11000) {
    const message = `Duplicate key found : ${JSON.stringify(error.keyValue)}`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'CastError') {
    const message = `${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};
