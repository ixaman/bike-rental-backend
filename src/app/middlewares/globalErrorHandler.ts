/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError, ZodIssue } from 'zod';
import { TErrorMessages } from '../errors/error.interface';
import { Error } from 'mongoose';

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode: number = err?.statusCode || 500;
  let message: string = err?.message || 'Something went wrong!';
  let errorMessages: TErrorMessages = [];

  //handling different kinds of error
  if (err instanceof ZodError) {
    message = 'Validation Error';
    statusCode = 400;
    errorMessages = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
  } else if (err?.code === 11000) {
    message = 'Duplicate Entry';
    statusCode = 400;
    errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err?.name === 'ValidationError') {
    message = 'Validation Error';
    statusCode = 400;

    errorMessages = Object.values(err?.errors as Error.ValidationError).map(
      (errItem: Error.ValidatorError | Error.CastError) => {
        return {
          path: errItem?.path,
          message: errItem?.message,
        };
      },
    );
  } else if (err?.name === 'CastError') {
    message = 'Cast Error';
    statusCode = 400;

    errorMessages = [
      {
        path: err?.path,
        message: err?.message,
      },
    ];
  }

  //sending final error response
  if (message === 'No Data Found') {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: [],
    });
  } else if (message === 'You have no access to this route') {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  } else {
    return res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: config.NODE_ENV === 'development' ? err.stack : null,
    });
  }
};

export default globalErrorHandler;
