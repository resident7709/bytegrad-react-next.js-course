import { z } from 'zod';

import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }).max(30, {
      message: 'Name must be less than 30 characters',
    }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: 'Owner name is required' })
      .max(30, { message: 'Owner name must be less than 30 characters' }),
    imageUrl: z.union([
      z.literal(''),
      z.string().trim().url({ message: 'Invalid imageURL' }),
    ]),
    age: z
      .union([
        z.string().trim().min(1, { message: 'Age is required' }),
        z.number().int({ message: 'Age must be an integer' }),
      ])
      .transform(value => {
        // Попытка преобразовать строку в число
        const numValue = Number(value);
        if (isNaN(numValue)) {
          throw new Error('Age must be a number');
        }
        return numValue;
      })
      .refine(value => value > 0 && value <= 111, {
        message: 'Age must be between 1 and 111',
      }),
    notes: z.union([z.literal(''), z.string().trim().max(1111)]),
  })
  .transform(data => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetFormData = z.infer<typeof petFormSchema>;
