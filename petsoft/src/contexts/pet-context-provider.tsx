'use client';

import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useTransition, useOptimistic } from 'react';

import { Pet } from '@prisma/client';
import { PetEssentials } from '@/lib/types';
import { addNewPet, deletePet, editPet } from '@/actions/actions';

type TPetContext = {
  pets: Pet[];
  numberOfPets: number;
  selectedPetId: Pet['id'] | null;
  selectedPet: Pet | undefined;
  addPet: (newPet: PetEssentials) => Promise<void>;
  updatePet: (petId: Pet['id'], updatedPet: PetEssentials) => Promise<void>;
  removePet: (id: Pet['id']) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet['id']) => void;
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
  const [isPending, startTransition] = useTransition();
  const [optimizedPets, setOptimizedPets] = useOptimistic(
    data,
    (state, { action, value }) => {
      switch (action) {
        case 'add':
          return [...state, { ...value, id: uuidv4() }];
        case 'edit':
          return state.map(pet =>
            pet.id === value.id ? { ...pet, ...value.updates } : pet,
          );
        case 'delete':
          return state.filter(pet => pet.id !== value);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimizedPets.find(pet => pet.id === selectedPetId);
  const numberOfPets = optimizedPets.length;

  const addPet = async (newPet: PetEssentials) => {
    startTransition(() => {
      setOptimizedPets({ action: 'add', value: newPet });
    });

    const error = await addNewPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const updatePet = async (petId: Pet['id'], updates: PetEssentials) => {
    startTransition(() => {
      setOptimizedPets({ action: 'edit', value: { id: petId, updates } });
    });

    const error = await editPet(petId, updates);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const removePet = async (petId: Pet['id']) => {
    startTransition(() => {
      setOptimizedPets({ action: 'delete', value: petId });
      setSelectedPetId(null);
    });

    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (id: Pet['id']) => setSelectedPetId(id);

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
