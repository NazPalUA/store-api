export type SortOrder = 'asc' | 'desc';

export interface SortCriteria {
  [key: string]: SortOrder;
}

export const parseSortFields = (
  sort?: string[]
): SortCriteria[] | undefined => {
  if (!sort) return undefined;

  return sort.map(field => ({
    [field.startsWith('-') ? field.slice(1) : field]: field.startsWith('-')
      ? 'desc'
      : 'asc',
  }));
};
