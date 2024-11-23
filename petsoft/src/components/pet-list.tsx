'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { usePetContext, useSearchContext } from '@/lib/hooks';

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery),
  );

  return (
    <ul className='border-b border-light bg-white'>
      {filteredPets.map(pet => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]',
              { 'bg-[#eff1f2]': pet.id === selectedPetId },
            )}
          >
            <Image
              src={pet.imageUrl}
              alt='Pet image'
              width={45}
              height={45}
              className='h-[45px] w-[45px] rounded-full object-cover'
            />
            <p className='font-semibold'>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
