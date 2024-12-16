export const PRODUCT_SORT_FIELDS = ['price', 'rating', 'name'] as const;

export const PRODUCT_NUMERIC_FIELDS = ['price', 'rating'] as const;

export const PRODUCT_SELECT_FIELDS = [
  'id',
  'name',
  'price',
  'featured',
  'rating',
  'company',
  'createdAt',
] as const;
