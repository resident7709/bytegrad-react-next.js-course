'use client';

import { createContext, useState } from 'react';

import { Pet } from '@/lib/types';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  // derived state
  const selectedPet = pets.find(pet => pet.id === selectedPetId);
  // actions
  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{ pets, selectedPetId, selectedPet, handleChangeSelectedPetId }}
    >
      {children}
    </PetContext.Provider>
  );
}
