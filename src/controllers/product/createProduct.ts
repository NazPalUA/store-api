import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { createProductSchema } from '../../schemas/product.schema';

type CreateProductRequest = Request<
  unknown,
  unknown,
  z.infer<typeof createProductSchema>['body']
>;

const createProduct = async (
  req: CreateProductRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, price, featured, rating, company } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      featured,
      rating,
      company,
    },
  });

  res.status(201).json({ success: true, data: product });
};

export { createProduct };
