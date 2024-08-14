import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import { TUser } from './user.interface';

const handleGetProfile = async (payload: JwtPayload) => {
  const { userEmail, role } = payload;

  const result = await User.findOne({ email: userEmail, role });

  return result;
};

const handleUpdateProfile = async (
  token: JwtPayload,
  payload: Partial<TUser>,
) => {
  const { userEmail, role } = token;

  const result = await User.findOneAndUpdate(
    { email: userEmail, role },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const UserServices = {
  handleGetProfile,
  handleUpdateProfile,
};
