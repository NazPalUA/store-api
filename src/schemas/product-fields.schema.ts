import { z } from 'zod';
import { PRODUCT_SELECT_FIELDS } from '../constants';

export const productFieldsSchema = z
  .string()
  .optional()
  .transform(val => {
    if (!val) return undefined;
    const fields = val.split(',').map(field => field.trim());
    const isValid = fields.every(field =>
      PRODUCT_SELECT_FIELDS.includes(
        field as (typeof PRODUCT_SELECT_FIELDS)[number]
      )
    );
    if (!isValid) throw new Error('Invalid select fields');
    return fields;
  });
