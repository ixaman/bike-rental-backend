import express from 'express';
import { RentalController } from './rental.controller';
import authenticateUser from '../../middlewares/authenticateUser';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middlewares/validateRequest';
import { RentalValidation } from './rental.validation';

const router = express.Router();

router.post(
  '/',
  authenticateUser(USER_ROLE.user),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalController.createRental,
);

router.put(
  '/:id/return',
  authenticateUser(USER_ROLE.admin),
  RentalController.returnBike,
);

router.get(
  '/',
  authenticateUser(USER_ROLE.user),
  RentalController.getMyRentals,
);

export const RentalRoutes = router;
