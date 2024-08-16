import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { RentalRoutes } from '../modules/rental/rental.route';

const router = Router();

const applicationRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoutes,
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
