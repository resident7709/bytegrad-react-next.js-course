'use client';

import { Input } from './ui/input';
import { Label } from './ui/label';
import PetFormBtn from './pet-form-btn';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { selectedPet, addPet, updatePet } = usePetContext();

  return (
    <form
      action={async formData => {
        onFormSubmit();

        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('owner') as string,
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
          age: Number(formData.get('age')),
          notes: formData.get('notes') as string,
        };

        if (actionType === 'add') {
          await addPet(petData);
        } else if (actionType === 'edit') {
          await updatePet(selectedPet!.id, petData);
        }
      }}
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
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='owner'>Owner</Label>
          <Input
            id='owner'
            type='text'
            name='owner'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            type='text'
            name='imageUrl'
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            type='number'
            name='age'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            name='notes'
            required
            rows={3}
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
