import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Logo from './components/Logo';
import Footer from './components/Footer';
import JobList from './components/JobList';
import Container from './components/Container';
import Background from './components/Background';
import SearchForm from './components/SearchForm';
import { RESULTS_PER_PAGE } from './lib/constants';
import { PageDirection, sortBy } from './lib/types';
import ResultsCount from './components/ResultsCount';
import { useDebounce, useJobItems } from './lib/hooks';
import Header, { HeaderTop } from './components/Header';
import JobItemContent from './components/JobItemContent';
import BookmarksButton from './components/BookmarksButton';
import Sidebar, { SidebarTop } from './components/Sidebar';
import SortingControls from './components/SortingControls';
import PaginationControls from './components/PaginationControls';

function App() {
  // state
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortBy>('relevant');

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    RESULTS_PER_PAGE * (currentPage - 1),
    currentPage * RESULTS_PER_PAGE,
  );

  // handlers
  const handleChangePage = (direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage(prev => prev - 1);
    }
  };
  const handleChangeSortBy = (newSortBy: sortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls
              sortBy={sortBy}
              onClick={handleChangeSortBy}
            />
          </SidebarTop>
          <JobList
            jobItems={jobItemsSortedAndSliced}
            isLoading={isLoading}
          />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />

      <Toaster position='bottom-right' />
    </>
  );
}

export default App;
