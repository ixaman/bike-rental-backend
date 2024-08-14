import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await UserServices.handleGetProfile(req.user);
});

export const AuthController = {
  getProfile,
};
