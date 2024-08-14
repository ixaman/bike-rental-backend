import express from 'express';
import authenticateUser from '../../middlewares/authenticateUser';
import { USER_ROLE } from './user.constants';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  authenticateUser(USER_ROLE.admin, USER_ROLE.user),
  UserController.getProfile,
);

router.put(
  '/me',
  authenticateUser(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserController.updateProfile,
);

export const UserRoutes = router;
