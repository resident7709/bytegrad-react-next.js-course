'use client';

import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from 'react';

import { Pet } from '@/lib/types';
import { addNewPet } from '@/actions/actions';

type TPetContext = {
  pets: Pet[];
  numberOfPets: number;
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  removePet: (id: string) => void;
  addPet: (newPet: Omit<Pet, 'id'>) => void;
  handleChangeSelectedPetId: (id: string) => void;
  updatePet: (petId: string, updatedPet: Omit<Pet, 'id'>) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const numberOfPets = pets.length;
  const selectedPet = pets.find(pet => pet.id === selectedPetId);

  const addPet = async (newPet: Omit<Pet, 'id'>) => {
    // setPets(prevPets => [...prevPets, { id: uuidv4(), ...newPet }]);

    await addNewPet(newPet);
  };

  const updatePet = (petId: string, updates: Omit<Pet, 'id'>) => {
    setPets(prevPets =>
      prevPets.map(pet => (pet.id === petId ? { ...pet, ...updates } : pet)),
    );
  };

  const removePet = (id: string) => {
    setPets(pets => pets.filter(pet => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        addPet,
        selectedPet,
        numberOfPets,
        updatePet,
        removePet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
