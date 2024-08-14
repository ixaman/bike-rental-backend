import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import CustomError from '../errors/CustomError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const authenticateUser = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //checking if the token is provided or not
    if (!token) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'Token not found!');
    }

    //checking if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userEmail, role } = decoded;

    //checking if the user is exist
    const user = await User.isUserExist(userEmail);

    if (!user) {
      throw new CustomError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    //checking if the roles matched
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload & { userEmail: string; role: string };

    next();
  });
};

export default authenticateUser;
