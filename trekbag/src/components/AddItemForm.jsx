import { useRef, useState } from 'react';

import Button from './Button';

export default function AddItemForm({ handleAddItem }) {
  const [itemText, setItemText] = useState('');
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    // basic validation
    if (!itemText) {
      alert('Please enter an item');
      inputRef.current.focus();
      return;
    }

    handleAddItem(itemText);
    setItemText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an Item</h2>
      <input
        value={itemText}
        autoFocus={true}
        ref={inputRef}
        onChange={e => {
          setItemText(e.target.value);
        }}
      />
      <Button>Add to list</Button>
    </form>
  );
}
