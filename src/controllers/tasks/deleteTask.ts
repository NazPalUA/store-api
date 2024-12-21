import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { connectDB } from '../../client';
import { NotFoundError } from '../../errors/not-found-error';
import { deleteTaskSchema } from '../../schemas/task.schema';

type DeleteTaskRequest = Request<z.infer<typeof deleteTaskSchema>['params']>;

const deleteTask = async (
  req: DeleteTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const db = await connectDB();
  const collection = db.collection('tasks');

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    throw new NotFoundError('Task');
  }

  res.status(200).json({ success: true, msg: 'Task deleted successfully' });
};

export { deleteTask };
