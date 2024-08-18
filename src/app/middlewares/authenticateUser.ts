import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import CustomError from '../errors/CustomError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const authenticateUser = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    //extracting token from bearer
    const bearer = req.header('Authorization') || '';
    const token = bearer.split(' ')[1];

    //checking if the token is provided or not
    if (!token) {
      throw new CustomError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
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
      throw new CustomError(httpStatus.NOT_FOUND, 'No Data Found');
    }

    //checking if the roles matched
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new CustomError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    if (user.role !== role || user.email !== userEmail) {
      throw new CustomError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload & { userEmail: string; role: string };

    next();
  });
};

export default authenticateUser;
