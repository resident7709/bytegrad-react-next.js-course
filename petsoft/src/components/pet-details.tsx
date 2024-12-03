'use client';

import Image from 'next/image';

import PetButton from './pet-button';
import { Pet } from '@prisma/client';
import { usePetContext } from '@/lib/hooks';

type Props = {
  pet: Pet;
};

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className='flex h-full w-full flex-col'>
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <PetImage pet={selectedPet} />
          <PetInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className='flex h-full items-center justify-center text-2xl font-medium'>
      No pet selected
    </p>
  );
}

function PetImage({ pet }: Props) {
  const { removePet } = usePetContext();

  return (
    <div className='flex items-center border-b border-light bg-white px-8 py-5'>
      <Image
        src={pet.imageUrl}
        alt='Pet image'
        width={75}
        height={75}
        className='h-[75px] w-[75px] rounded-full object-cover'
      />
      <h2 className='ml-5 text-3xl font-semibold leading-7'>{pet.name}</h2>
      <div className='ml-auto space-x-2'>
        <PetButton actionType='edit'>Edit</PetButton>
        <PetButton
          actionType='checkout'
          onClick={async () => await removePet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function PetInfo({ pet }: Props) {
  return (
    <div className='flex justify-around px-5 py-10 text-center'>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
          Owner name
        </h3>
        <p className='text-zinx-800 mt-1 text-lg'>{pet.ownerName}</p>
      </div>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>Age</h3>
        <p className='text-zinx-800 mt-1 text-lg'>{pet.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ pet }: Props) {
  return (
    <section className='mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5'>
      {pet.notes}
    </section>
  );
}
