import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .nonempty('Name is required')
        .min(3, 'Name must be at least 3 characters long'),
    })
    .strict(),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().nonempty('Task ID is required'),
  }),
  body: z
    .object({
      name: z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .optional(),
      completed: z.boolean().optional(),
    })
    .strict(),
});

export const getTaskSchema = z.object({
  params: z.object({
    id: z.string().nonempty('Task ID is required'),
  }),
});

export const deleteTaskSchema = getTaskSchema;
