import Button from './Button';

export default function AddItemForm() {
  return (
    <form>
      <h2>Add an Item</h2>
      <input type='text' />
      <Button>Add to list</Button>
    </form>
  );
}
