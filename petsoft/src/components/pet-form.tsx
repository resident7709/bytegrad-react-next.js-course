// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import PetFormBtn from './pet-form-btn';
// import { Textarea } from './ui/textarea';
// import { usePetContext } from '@/lib/hooks';
// import { DEFAULT_PET_IMAGE } from '@/lib/constants';
// import { petFormSchema, TPetFormData } from '@/lib/validations';

// type PetFormProps = {
//   actionType: 'add' | 'edit';
//   onFormSubmit: () => void;
// };

// export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
//   const { selectedPet, addPet, updatePet } = usePetContext();

//   const {
//     register,
//     trigger,
//     getValues,
//     formState: { errors },
//   } = useForm<TPetFormData>({
//     resolver: zodResolver(petFormSchema),
//     defaultValues: {
//       name: selectedPet?.name,
//       ownerName: selectedPet?.ownerName,
//       imageUrl: selectedPet?.imageUrl,
//       age: selectedPet?.age,
//       notes: selectedPet?.notes,
//     },
//   });

//   return (
//     <form
//       action={async () => {
//         const isValid = await trigger();
//         console.error('Validation errors:', errors); // Логгирование ошибок валидации на клиентской стороне
//         if (!isValid) return;

//         onFormSubmit();

//         const petData = getValues();
//         petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

//         if (actionType === 'add') {
//           await addPet(petData);
//         } else if (actionType === 'edit') {
//           await updatePet(selectedPet!.id, petData);
//         }
//       }}
//       className='flex flex-col'
//     >
//       <div className='space-y-3'>
//         <div className='space-y-1'>
//           <Label htmlFor='name'>Name</Label>
//           <Input
//             id='name'
//             {...register('name', {
//               required: 'Name is required',
//             })}
//           />
//           {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
//         </div>
//         <div className='space-y-1'>
//           <Label htmlFor='owner'>Owner</Label>
//           <Input
//             id='owner'
//             {...register('ownerName', {
//               required: 'Owner name is required',
//             })}
//           />
//           {errors.ownerName && (
//             <p className='text-red-500'>{errors.ownerName.message}</p>
//           )}
//         </div>
//         <div className='space-y-1'>
//           <Label htmlFor='imageUrl'>Image URL</Label>
//           <Input
//             id='imageUrl'
//             {...register('imageUrl')}
//           />
//           {errors.imageUrl && (
//             <p className='text-red-500'>{errors.imageUrl.message}</p>
//           )}
//         </div>
//         <div className='space-y-1'>
//           <Label htmlFor='age'>Age</Label>
//           <Input
//             id='age'
//             {...register('age')}
//           />
//           {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
//         </div>
//         <div className='space-y-1'>
//           <Label htmlFor='notes'>Notes</Label>
//           <Textarea
//             id='notes'
//             {...register('notes')}
//           />
//           {errors.notes && (
//             <p className='text-red-500'>{errors.notes.message}</p>
//           )}
//         </div>
//       </div>
//       <PetFormBtn actionType={actionType} />
//     </form>
//   );
// }

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import PetFormBtn from './pet-form-btn';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { petFormSchema, TPetFormData } from '@/lib/validations';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { selectedPet, addPet, updatePet } = usePetContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TPetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: '',
      ownerName: '',
      imageUrl: '',
      age: 0,
      notes: '',
    },
  });

  useEffect(() => {
    if (selectedPet) {
      reset(selectedPet);
    }
  }, [selectedPet, reset]);

  const onSubmit = async (data: TPetFormData) => {
    if (actionType === 'add') {
      await addPet(data);
    } else if (actionType === 'edit') {
      await updatePet(selectedPet!.id, data);
    }
    onFormSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col'
    >
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='owner'>Owner</Label>
          <Input
            id='ownerName'
            {...register('ownerName', { required: 'Owner name is required' })}
          />
          {errors.ownerName && (
            <p className='text-red-500'>{errors.ownerName.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            {...register('imageUrl', {
              validate: value =>
                !value ||
                (value && /^(https?:\/\/[^\s]+)$/.test(value)) ||
                'Invalid URL',
            })}
          />
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            type='number'
            {...register('age', {
              valueAsNumber: true,
              required: 'Age is required',
            })}
          />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            {...register('notes')}
          />
          {errors.notes && (
            <p className='text-red-500'>{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
