import { z } from 'zod';
import { PRODUCT_SORT_FIELDS } from '../constants';

export const productSortSchema = z
  .string()
  .optional()
  .transform(val => {
    if (!val) return undefined;
    const sortFields = val.split(',').map(field => field.trim());

    const isValid = sortFields.every(field => {
      const cleanField = field.startsWith('-') ? field.slice(1) : field;
      return PRODUCT_SORT_FIELDS.includes(
        cleanField as (typeof PRODUCT_SORT_FIELDS)[number]
      );
    });

    if (!isValid) {
      throw new Error('Invalid product sort fields');
    }

    return sortFields;
  });
