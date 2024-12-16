import { NUMERIC_OPERATORS, PRODUCT_NUMERIC_FIELDS } from '../constants';

export interface ProductNumericFilter {
  [key: string]: {
    [operator: string]: number;
  };
}

export const parseProductNumericFilters = (
  numericFilters?: string
): ProductNumericFilter => {
  if (!numericFilters) return {};

  const regEx = /\b(<|>|>=|=|<=)\b/g;
  const filters = numericFilters.replace(
    regEx,
    match => `$${NUMERIC_OPERATORS[match as keyof typeof NUMERIC_OPERATORS]}$`
  );

  const filterArray = filters.split(',').map(item => item.split('$'));
  const where: ProductNumericFilter = {};

  filterArray.forEach(([field, operator, value]) => {
    if (
      PRODUCT_NUMERIC_FIELDS.includes(
        field as (typeof PRODUCT_NUMERIC_FIELDS)[number]
      )
    ) {
      where[field] = { [operator]: Number(value) };
    }
  });

  return where;
};
