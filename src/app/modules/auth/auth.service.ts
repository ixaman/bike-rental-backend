import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import CustomError from '../../errors/CustomError';
import httpStatus from 'http-status';

const handleSignUpUser = async (payload: TUser) => {
  // checking if user already exist
  const existingUser = await User.isUserExist(payload.email);

  if (existingUser) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `Duplicate Entry: '${payload.email}' is already exist!`,
    );
  }

  const result = await User.create(payload);

  result.password = undefined!;

  return result;
};

const handleLoginUser = async (payload: TLogin) => {
  //check if the user is exist
  const user = await User.isUserExist(payload.email);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  //check if the password is matched
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new Error('Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  };

  return {
    accessToken,
    userWithoutPassword,
  };
};

export const AuthServices = {
  handleSignUpUser,
  handleLoginUser,
};
