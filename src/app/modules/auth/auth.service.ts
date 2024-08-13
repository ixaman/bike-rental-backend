import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const handleSignUpUser = async (payload: TUser) => {
  const existingUser = await User.isUserExist(payload.email);

  if (existingUser) {
    throw new Error('User already exists!');
  }

  const result = await User.create(payload);

  return result;
};

const handleLoginUser = async (payload: JwtPayload) => {};

export const AuthServices = {
  handleSignUpUser,
  handleLoginUser,
};
