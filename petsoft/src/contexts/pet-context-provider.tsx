'use client';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { createContext, useState, useOptimistic } from 'react';

import { Pet } from '@/lib/types';
import { addNewPet, deletePet, editPet } from '@/actions/actions';

type TPetContext = {
  pets: Pet[];
  numberOfPets: number;
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  addPet: (newPet: Omit<Pet, 'id'>) => Promise<void>;
  updatePet: (petId: string, updatedPet: Omit<Pet, 'id'>) => Promise<void>;
  removePet: (id: string) => Promise<void>;
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
  const [optimizedPets, setOptimizedPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [...state, { ...newPet, id: uuidv4() }];
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimizedPets.find(pet => pet.id === selectedPetId);
  const numberOfPets = optimizedPets.length;

  const addPet = async (newPet: Omit<Pet, 'id'>) => {
    setOptimizedPets(newPet);

    const error = await addNewPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const updatePet = async (petId: string, updates: Omit<Pet, 'id'>) => {
    const error = await editPet(petId, updates);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const removePet = async (petId: string) => {
    await deletePet(petId);
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  return (
    <PetContext.Provider
      value={{
        pets: optimizedPets,
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
