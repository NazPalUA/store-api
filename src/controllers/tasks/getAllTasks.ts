import { NextFunction, Request, Response } from 'express';
import { taskCollection } from '../../client';

const getAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tasks = await taskCollection.find({}).toArray();
  res.status(200).json({ success: true, data: tasks });
};

export { getAllTasks };
