import Button from './Button';
import { secondaryButtons } from '../lib/constants';

export default function ButtonGroup() {
  return (
    <section className='button-group'>
      {secondaryButtons.map(text => {
        return (
          <Button
            type='secondary'
            key={text}
          >
            {text}
          </Button>
        );
      })}
    </section>
  );
}
