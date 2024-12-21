import { Sort, SortDirection } from 'mongodb';

export const parseSortFields = (sort?: string[]): Sort | undefined => {
  if (!sort) return undefined;

  return sort.reduce(
    (acc, field) => ({
      ...acc,
      [getFieldKey(field)]: getSortDirection(field),
    }),
    {}
  );
};

function getSortDirection(field: string): SortDirection {
  return field.startsWith('-') ? -1 : 1;
}

function getFieldKey(field: string): string {
  return field.startsWith('-') ? field.slice(1) : field;
}
