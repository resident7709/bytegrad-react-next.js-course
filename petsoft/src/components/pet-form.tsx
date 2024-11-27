'use client';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

export default function PetForm({ actionType }: PetFormProps) {
  const { handleAddPet } = usePetContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newPet = {
      name: formData.get('name') as string,
      ownerName: formData.get('owner') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };

    handleAddPet(newPet);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col'
    >
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            type='text'
            name='name'
            required
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='owner'>Owner</Label>
          <Input
            id='owner'
            type='text'
            name='owner'
            required
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            type='text'
            name='imageUrl'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            type='number'
            name='age'
            required
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            name='notes'
            required
            rows={3}
          />
        </div>
      </div>
      <Button
        type='submit'
        className='mt-5 self-end'
      >
        {actionType === 'add' ? 'Add pet' : 'Edit pet'}
      </Button>
    </form>
  );
}
