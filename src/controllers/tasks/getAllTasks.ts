import { NextFunction, Request, Response } from 'express';
import { connectDB } from '../../client';

const getAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const db = await connectDB();
  const collection = db.collection('tasks');

  const tasks = await collection.find({}).toArray();
  res.status(200).json({ success: true, data: tasks });
};

export { getAllTasks };
