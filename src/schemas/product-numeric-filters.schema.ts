import { z } from 'zod';
import { PRODUCT_NUMERIC_FIELDS } from '../constants';

export const productNumericFiltersSchema = z
  .string()
  .optional()
  .refine(
    val => {
      if (!val) return true;
      const filterParts = val.split(',');
      return filterParts.every(part => {
        const matches = part.match(/^(\w+)(<=|>=|=|<|>)(\d+(\.\d+)?)$/);
        if (!matches) return false;
        const [, field] = matches;
        return PRODUCT_NUMERIC_FIELDS.includes(
          field as (typeof PRODUCT_NUMERIC_FIELDS)[number]
        );
      });
    },
    {
      message:
        'Invalid numeric filter format. Use pattern: field(>=|<=|=|>|<)number',
    }
  );
