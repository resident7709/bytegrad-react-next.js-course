'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { delay } from '@/lib/utils';

export async function addNewPet(formData) {
  await delay(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get('name'),
        ownerName: formData.get('owner'),
        imageUrl:
          formData.get('imageUrl') ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        age: Number(formData.get('age')),
        notes: formData.get('notes'),
      },
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId, formData) {
  await delay(2000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get('name'),
        ownerName: formData.get('owner'),
        imageUrl:
          formData.get('imageUrl') ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        age: Number(formData.get('age')),
        notes: formData.get('notes'),
      },
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
