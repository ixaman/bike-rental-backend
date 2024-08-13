import { ErrorRequestHandler } from 'express';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages: err,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
