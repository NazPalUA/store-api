import { NextFunction, Request, Response } from 'express';
import { productCollection } from '../../client';
import { PRODUCT_NUMERIC_FIELDS } from '../../constants';
import { productQuerySchema } from '../../schemas/product-query.schema';
import { parseNumericComparisons } from '../../utils/parse-numeric-filters';
import { parseSortFields } from '../../utils/parse-sort-fields';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, featured, company, name, sort, numericFilters, fields } =
    productQuerySchema.parse(req.query);

  // Base query
  const filter: Record<string, any> = {
    ...(featured !== undefined && { featured }),
    ...(company && { company }),
    ...(name && { name: { $regex: name, $options: 'i' } }),
    ...parseNumericComparisons(PRODUCT_NUMERIC_FIELDS, numericFilters),
  };

  // Handle sorting
  const sortOptions = parseSortFields(sort);

  // Handle field selection
  const projection = fields?.reduce(
    (acc, field) => ({ ...acc, [field]: 1 }),
    {}
  );

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const [products, totalProducts] = await Promise.all([
    productCollection
      .find(filter, { projection })
      .sort(sortOptions ?? {})
      .skip(skip)
      .limit(limit)
      .toArray(),
    productCollection.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    success: true,
    total: totalProducts,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    data: products,
  });
};

export { getAllProducts };
