import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { taskCollection } from '../../client';
import { NotFoundError } from '../../errors/not-found-error';
import { getTaskSchema } from '../../schemas/task.schema';

type GetTaskRequest = Request<z.infer<typeof getTaskSchema>['params']>;

const getTask = async (
  req: GetTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const task = await taskCollection.findOne({ _id: new ObjectId(id) });

  if (!task) {
    throw new NotFoundError('Task');
  }

  res.status(200).json({ success: true, data: task });
};

export { getTask };
