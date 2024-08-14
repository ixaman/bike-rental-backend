import express from 'express';
import authenticateUser from '../../middlewares/authenticateUser';
import { USER_ROLE } from './user.constants';
import { AuthController } from './user.controller';

const router = express.Router();

router.get(
  '/me',
  authenticateUser(USER_ROLE.admin, USER_ROLE.user),
  AuthController.getProfile,
);

export const UserRoutes = router;
