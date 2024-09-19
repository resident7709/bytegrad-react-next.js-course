import { useContext } from 'react';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { BookmarksContext } from '../contexts/BookmarksContextProvider';

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext);

  return (
    <button
      className='bookmark-btn'
      onClick={e => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`}
      />
    </button>
  );
}
