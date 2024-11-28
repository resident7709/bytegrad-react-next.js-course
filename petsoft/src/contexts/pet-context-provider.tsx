'use client';

import { createContext, useState } from 'react';

import { Pet } from '@/lib/types';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
  handleCheckoutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, 'id'>) => void;
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
  const numberOfPets = pets.length;
  // actions
  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    setPets(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        ...newPet,
      },
    ]);
  };
  const handleEditPet = (petId: string, updatedPet: Omit<Pet, 'id'>) => {
    setPets(prev =>
      prev.map(pet => {
        if (pet.id === petId) return { id: petId, ...updatedPet };
        return pet;
      }),
    );
  };
  const handleCheckoutPet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleAddPet,
        selectedPet,
        numberOfPets,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
