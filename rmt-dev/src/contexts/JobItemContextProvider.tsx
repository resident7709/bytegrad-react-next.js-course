import { createContext, useCallback, useMemo, useState } from 'react';

import { RESULTS_PER_PAGE } from '../lib/constants';
import { JobItem, PageDirection, sortBy } from '../lib/types';
import { useSearchQuery, useSearchTextContext } from '../lib/hooks';

type JobItemsContext = {
  sortBy: sortBy;
  isLoading: boolean;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  handleChangeSortBy: (newSortBy: sortBy) => void;
  handleChangePage: (direction: PageDirection) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortBy>('relevant');

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === 'relevant') {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems],
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        RESULTS_PER_PAGE * (currentPage - 1),
        currentPage * RESULTS_PER_PAGE,
      ),
    [currentPage, jobItemsSorted],
  );

  // handlers
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage(prev => prev - 1);
    }
  }, []);
  const handleChangeSortBy = useCallback((newSortBy: sortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      sortBy,
      jobItems,
      isLoading,
      currentPage,
      handleChangePage,
      handleChangeSortBy,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
    }),
    [
      sortBy,
      jobItems,
      isLoading,
      currentPage,
      handleChangePage,
      handleChangeSortBy,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
    ],
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
