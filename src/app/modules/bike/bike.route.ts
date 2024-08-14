import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeController } from './bike.controller';
import authenticateUser from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post(
  '/',
  authenticateUser(USER_ROLE.admin),
  validateRequest(BikeValidation.createBikeValidationSchema),
  BikeController.createBike,
);

export const BikeRoutes = router;
