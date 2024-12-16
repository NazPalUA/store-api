export type ProductOrderDirection = 'asc' | 'desc';

export interface ProductOrderBy {
  [key: string]: ProductOrderDirection;
}

export const parseProductSort = (
  sort?: string[]
): ProductOrderBy[] | undefined => {
  if (!sort) return undefined;

  return sort.map(field => ({
    [field.startsWith('-') ? field.slice(1) : field]: field.startsWith('-')
      ? 'desc'
      : 'asc',
  }));
};
