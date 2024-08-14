import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const signUpUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await AuthServices.handleSignUpUser(userData);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.handleLoginUser(req.body);

  const { accessToken, userWithoutPassword } = result;

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: userWithoutPassword,
  });
});

export const AuthController = {
  signUpUser,
  loginUser,
};
