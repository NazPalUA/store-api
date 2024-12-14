import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
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

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.status(200).json({ success: true, data: task });
};

export { updateTask };
