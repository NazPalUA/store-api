import { NextFunction, Request, Response } from 'express';
import prisma from '../../client';

const getAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tasks = await prisma.task.findMany();
  res.status(200).json({ success: true, data: tasks });
};

export { getAllTasks };
