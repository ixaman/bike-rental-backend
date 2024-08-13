import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const signUpUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await AuthServices.handleSignUpUser(userData);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthController = {
  signUpUser,
};
