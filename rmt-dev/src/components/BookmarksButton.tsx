import { useRef, useState } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import { useOnClickOutside } from '../lib/hooks';
import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([buttonRef, popoverRef], () => {
    setIsOpen(false);
  });

  return (
    <section>
      <button
        ref={buttonRef}
        className='bookmarks-btn'
        onClick={() => setIsOpen(!isOpen)}
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
