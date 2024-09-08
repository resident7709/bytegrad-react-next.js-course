import { useEffect, useState } from 'react';

import Logo from './components/Logo';
import Footer from './components/Footer';
import JobList from './components/JobList';
import Container from './components/Container';
import Background from './components/Background';
import SearchForm from './components/SearchForm';
import ResultsCount from './components/ResultsCount';
import Header, { HeaderTop } from './components/Header';
import JobItemContent from './components/JobItemContent';
import BookmarksButton from './components/BookmarksButton';
import Sidebar, { SidebarTop } from './components/Sidebar';
import SortingControls from './components/SortingControls';
import PaginationControls from './components/PaginationControls';

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
      );
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList
            jobItems={jobItems}
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
