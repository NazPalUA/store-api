import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { taskCollection } from '../../client';
import { NotFoundError } from '../../errors/not-found-error';
import { updateTaskSchema } from '../../schemas/task.schema';

type UpdateTaskRequest = Request<
  z.infer<typeof updateTaskSchema>['params'],
  unknown,
  z.infer<typeof updateTaskSchema>['body']
>;

const updateTask = async (
  req: UpdateTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const result = await taskCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body },
    { returnDocument: 'after' }
  );

  if (!result?.value) {
    throw new NotFoundError('Task');
  }

  res.status(200).json({ success: true, data: result.value });
};

export { updateTask };
