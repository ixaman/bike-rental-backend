import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const handleSignUpUser = async (payload: TUser) => {
  const existingUser = await User.isUserExist(payload.email);

  if (existingUser) {
    throw new Error('User already exists!');
  }

  const result = await User.create(payload);

  return result;
};

const handleLoginUser = async (payload: TLogin) => {
  //check if the user is exist
  const user = await User.isUserExist(payload.email);

  if (!user) {
    throw new Error('User not found!');
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

  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  handleSignUpUser,
  handleLoginUser,
};
