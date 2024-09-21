import { createContext } from 'react';

import { JobItemExpanded } from '../lib/types';
import { useJobItems, useLocalStorage } from '../lib/hooks';

type BookmarksContext = {
  isLoading: boolean;
  bookmarkedIds: number[];
  bookmarkedJobItems: JobItemExpanded[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    [],
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
    } else {
      setBookmarkedIds(prev => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarkedIds,
        bookmarkedJobItems,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
