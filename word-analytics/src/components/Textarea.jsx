import { useState } from 'react';

import Warning from './Warning';

export default function Textarea({ text, setText }) {
  const [warning, setWarning] = useState('');

  const handleChange = e => {
    let newText = e.target.value;

    // * Basic validation
    if (newText.includes('<script>')) {
      setWarning('Please remove <script> tag');
      newText = newText.replace('<script>', '');
    } else if (newText.includes('@')) {
      setWarning('Please remove @ symbol');
      newText = newText.replace('@', '');
    } else {
      setWarning('');
    }

    setText(newText);
  };

  return (
    <section className='textarea'>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder='Type here..'
        spellCheck='false'
      />
      <Warning warning={warning} />
    </section>
  );
}
