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

export const AuthRoutes = router;
