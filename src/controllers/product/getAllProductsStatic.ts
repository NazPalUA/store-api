import { Request, Response } from 'express';

const getAllProductsStatic = async (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Products Route Static' });
};

export { getAllProductsStatic };
