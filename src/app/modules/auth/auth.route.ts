import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { Authvalidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(Authvalidations.signUpUserValidationSchema),
  AuthController.signUpUser,
);

router.post(
  '/login',
  validateRequest(Authvalidations.loginUserValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
