import { z } from 'zod';

export const createProductSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .nonempty('Name is required')
        .min(3, 'Name must be at least 3 characters long'),
      price: z.number().min(0, 'Price must be greater than 0'),
      featured: z.boolean().default(false),
      rating: z.number().min(0).max(5).default(0),
      company: z.enum(['ikea', 'liddy', 'caressa', 'marcos'], {
        required_error: 'Company is required',
        invalid_type_error:
          'Company must be one of: ikea, liddy, caressa, marcos',
      }),
    })
    .strict(),
});
