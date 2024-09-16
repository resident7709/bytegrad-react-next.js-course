import { useState } from 'react';

import Logo from './components/Logo';
import Footer from './components/Footer';
import JobList from './components/JobList';
import Container from './components/Container';
import Background from './components/Background';
import SearchForm from './components/SearchForm';
import ResultsCount from './components/ResultsCount';
import { useDebounce, useJobItems } from './lib/hooks';
import Header, { HeaderTop } from './components/Header';
import JobItemContent from './components/JobItemContent';
import BookmarksButton from './components/BookmarksButton';
import Sidebar, { SidebarTop } from './components/Sidebar';
import SortingControls from './components/SortingControls';
import PaginationControls from './components/PaginationControls';

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

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
            <SortingControls />
          </SidebarTop>
          <JobList
            jobItems={jobItemsSliced}
            isLoading={isLoading}
          />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
