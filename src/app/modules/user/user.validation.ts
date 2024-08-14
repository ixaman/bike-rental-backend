import { z } from 'zod';

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

export const UserValidation = {
  userUpdateValidationSchema,
};
