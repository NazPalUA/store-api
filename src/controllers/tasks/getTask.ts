import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { CustomError } from '../../errors/custom-error';
import { getTaskSchema } from '../../schemas/task.schema';

type GetTaskRequest = Request<z.infer<typeof getTaskSchema>['params']>;

const getTask = async (
  req: GetTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({ where: { id: Number(id) } });

  if (!task) {
    return next(new CustomError(`No task with id ${id}`, 404));
  }

  res.status(200).json({ success: true, data: task });
};

export { getTask };
