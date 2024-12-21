import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { connectDB } from '../../client';
import { createTaskSchema } from '../../schemas/task.schema';

type CreateTaskRequest = Request<
  unknown,
  unknown,
  z.infer<typeof createTaskSchema>['body']
>;

const createTask = async (
  req: CreateTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  const db = await connectDB();
  const collection = db.collection('tasks');

  const result = await collection.insertOne({
    name,
    completed: false,
  });

  res.status(201).json({
    success: true,
    data: { _id: result.insertedId, name, completed: false },
  });
};

export { createTask };
