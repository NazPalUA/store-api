import { NextFunction, Request, Response } from 'express';
import prisma from '../../client';

const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const products = await prisma.product.findMany();
  res.status(200).json({ success: true, data: products });
};

export { getAllProducts };
