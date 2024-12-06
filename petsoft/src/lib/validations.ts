import { z } from 'zod';

// import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(33),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: 'Owner name is required' })
    .max(33),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Image URL is invalid' }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive()
    .max(111, { message: 'Age is required' }),
  notes: z.union([z.literal(''), z.string().trim().max(1111)]),
});
// .transform(data => ({
//   ...data,
//   imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
// }));

export type TPetFormData = z.infer<typeof petFormSchema>;
