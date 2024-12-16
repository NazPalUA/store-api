import { z } from 'zod';
import { PRODUCT_PAGINATION } from '../constants';
import { productFieldsSchema } from './product-fields.schema';
import { productNumericFiltersSchema } from './product-numeric-filters.schema';
import { productSortSchema } from './product-sort.schema';

export const productQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform(val => Number(val) || PRODUCT_PAGINATION.page),
  limit: z
    .string()
    .optional()
    .transform(val => Number(val) || PRODUCT_PAGINATION.limit),
  featured: z
    .string()
    .optional()
    .transform(val => val === 'true'),
  company: z.enum(['ikea', 'liddy', 'caressa', 'marcos']).optional(),
  name: z.string().optional(),
  sort: productSortSchema,
  numericFilters: productNumericFiltersSchema,
  fields: productFieldsSchema,
});
