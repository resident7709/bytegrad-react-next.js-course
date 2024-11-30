'use client';

import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { Button } from './ui/button';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  children,
  onClick,
  disabled,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout')
    return (
      <Button
        variant='secondary'
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    );

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={setIsFormOpen}
    >
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size='icon'>
            <PlusIcon style={{ height: '24px', width: '24px' }} />
          </Button>
        ) : (
          <Button variant='secondary'>{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmit={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
