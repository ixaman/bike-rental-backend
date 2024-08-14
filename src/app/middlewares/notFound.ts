import { RequestHandler } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    suuccess: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'Not found!',
  });
};

export default notFound;
