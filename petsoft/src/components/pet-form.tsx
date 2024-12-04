'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from './ui/input';
import { Label } from './ui/label';
import PetFormBtn from './pet-form-btn';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmit: () => void;
};

type TPetFormData = {
  name: string;
  owner: string;
  imageUrl: string;
  age: number;
  notes: string;
};

const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(30, {
    message: 'Name must be less than 30 characters',
  }),
  owner: z
    .string()
    .trim()
    .min(1, { message: 'Owner name is required' })
    .max(30, { message: 'Owner name must be less than 30 characters' }),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Invalid image URL' }),
  ]),
  age: z
    .union([
      z
        .number()
        .int({ message: 'Age must be an integer' })
        .positive()
        .min(0, { message: 'Age must be greater than 0' })
        .max(111, { message: 'Age must be less than 111' }),
      z.string().trim().min(1, { message: 'Age is required' }),
    ])
    .refine(value => typeof value === 'number', {
      message: 'Age must be a number',
    }),
  notes: z.union([z.literal(''), z.string().trim().max(1111)]),
});

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { selectedPet, addPet, updatePet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TPetFormData>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async formData => {
        const isValid = await trigger();
        if (!isValid) return;

        onFormSubmit();

        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('owner') as string,
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
          age: Number(formData.get('age')),
          notes: formData.get('notes') as string,
        };

        if (actionType === 'add') {
          await addPet(petData);
        } else if (actionType === 'edit') {
          await updatePet(selectedPet!.id, petData);
        }
      }}
      className='flex flex-col'
    >
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='owner'>Owner</Label>
          <Input
            id='owner'
            {...register('owner', {
              required: 'Owner name is required',
            })}
          />
          {errors.owner && (
            <p className='text-red-500'>{errors.owner.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            {...register('imageUrl')}
          />
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            {...register('age')}
          />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            {...register('notes')}
          />
          {errors.notes && (
            <p className='text-red-500'>{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
