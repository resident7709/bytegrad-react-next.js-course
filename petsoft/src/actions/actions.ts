'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { delay } from '@/lib/utils';
import { Pet } from '@prisma/client';
import { PetEssentials } from '@/lib/types';

export async function addNewPet(pet: PetEssentials) {
  await delay(1000);

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: Pet['id'], newPetData: PetEssentials) {
  await delay(1000);

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

export async function deletePet(petId: Pet['id']) {
  await delay(1000);

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
