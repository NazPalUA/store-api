import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/tasks';
import { validate } from '../middleware/validate';
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from '../schemas/task.schema';

const router = Router();

router.route('/').get(getAllTasks).post(validate(createTaskSchema), createTask);

router
  .route('/:id')
  .get(validate(getTaskSchema), getTask)
  .patch(validate(updateTaskSchema), updateTask)
  .delete(validate(deleteTaskSchema), deleteTask);

export default router;
