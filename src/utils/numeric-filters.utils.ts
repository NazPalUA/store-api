import { NUMERIC_OPERATORS } from '../constants';

export interface NumericFilter {
  [key: string]: {
    [operator: string]: number;
  };
}

export const parseNumericComparisons = (
  allowedFieldsArr: readonly string[] = [],
  filtersQuery?: string
): NumericFilter => {
  if (!filtersQuery) return {};

  const regEx = /\b(<|>|>=|=|<=)\b/g;
  const filters = filtersQuery.replace(
    regEx,
    match => `$${NUMERIC_OPERATORS[match as keyof typeof NUMERIC_OPERATORS]}$`
  );

  const filterArray = filters.split(',').map(item => item.split('$'));
  const where: NumericFilter = {};

  filterArray.forEach(([field, operator, value]) => {
    if (allowedFieldsArr.includes(field)) {
      where[field] = { [operator]: Number(value) };
    }
  });

  return where;
};
