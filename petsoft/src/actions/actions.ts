'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { delay } from '@/lib/utils';
import { petFormSchema, petIdSchema } from '@/lib/validations';

export async function addNewPet(pet: unknown) {
  await delay(1000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) return { message: 'Invalid pet data' };

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await delay(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetId.success || !validatedPet.success)
    return { message: 'Invalid pet data' };

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: unknown) {
  await delay(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) return { message: 'Invalid pet data' };

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return { message: 'Failed to remove pet' };
  }

  revalidatePath('/app', 'layout');
}
