import { NUMERIC_OPERATORS } from '../constants';

export const parseNumericComparisons = (
  allowedFields: string[] | readonly string[],
  filters?: string
): Record<string, any> => {
  if (!filters) return {};

  const regEx = /\b(<|>|>=|=|<=)\b/g;
  const mongoFilters = filters.replace(
    regEx,
    match => `-${NUMERIC_OPERATORS[match as keyof typeof NUMERIC_OPERATORS]}-`
  );

  return mongoFilters.split(',').reduce((acc, filter) => {
    const [field, operator, value] = filter.split('-');
    if (allowedFields.includes(field)) {
      acc[field] = { [operator]: Number(value) };
    }
    return acc;
  }, {} as Record<string, any>);
};
