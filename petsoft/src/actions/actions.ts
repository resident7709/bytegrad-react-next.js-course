'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

export async function addNewPet(formData) {
  console.log(formData);

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

  revalidatePath('/app', 'layout');
}
