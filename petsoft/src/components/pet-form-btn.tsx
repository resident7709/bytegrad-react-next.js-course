import { Button } from './ui/button';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

export default function petFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button
      type='submit'
      className='mt-5 self-end'
    >
      {actionType === 'add' ? 'Add pet' : 'Edit pet'}
    </Button>
  );
}
