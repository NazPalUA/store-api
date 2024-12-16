import { NextFunction, Request, Response } from 'express';
import prisma from '../../client';
import { PRODUCT_NUMERIC_FIELDS } from '../../constants';
import { productQuerySchema } from '../../schemas/product-query.schema';
import { parseNumericComparisons } from '../../utils/numeric-filters.utils';
import { parseProductSort } from '../../utils/product-sort.utils';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, featured, company, name, sort, numericFilters, fields } =
    productQuerySchema.parse(req.query);

  // Base query
  const where: Record<string, any> = {
    ...(featured !== undefined && { featured }),
    ...(company && { company }),
    ...(name && { name: { contains: name, mode: 'insensitive' } }),
    ...parseNumericComparisons(PRODUCT_NUMERIC_FIELDS, numericFilters),
  };

  // Handle sorting
  const orderBy = parseProductSort(sort);

  // Handle field selection
  const select = fields?.reduce(
    (acc, field) => ({ ...acc, [field]: true }),
    {}
  );

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      ...(select && { select }),
    }),
    prisma.product.count({ where }),
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
