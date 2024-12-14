import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../client';
import { deleteTaskSchema } from '../../schemas/task.schema';

type DeleteTaskRequest = Request<z.infer<typeof deleteTaskSchema>['params']>;

const deleteTask = async (
  req: DeleteTaskRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id: Number(id) } });
  res.status(200).json({ success: true, msg: 'Task deleted successfully' });
};

export { deleteTask };
