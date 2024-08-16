import { z } from 'zod';

const createRentalValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: z.string(),
  }),
});

export const RentalValidation = {
  createRentalValidationSchema,
};
