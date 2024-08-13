import { RequestHandler } from 'express';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;

    const result = await AuthServices.handleSignUpUser(userData);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signUpUser,
};
