'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { delay } from '@/lib/utils';

export async function addNewPet(pet) {
  await delay(2000);

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId, newPetData) {
  await delay(2000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId) {
  await delay(2000);

  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return { message: 'Failed to remove pet' };
  }

  revalidatePath('/app', 'layout');
}
