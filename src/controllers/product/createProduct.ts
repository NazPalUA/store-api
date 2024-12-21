import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { connectDB } from '../../client';
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

  const db = await connectDB();
  const collection = db.collection('products');

  const product = await collection.insertOne({
    name,
    price,
    featured,
    rating,
    company,
  });

  res.status(201).json({
    success: true,
    data: { _id: product.insertedId, name, price, featured, rating, company },
  });
};

export { createProduct };
