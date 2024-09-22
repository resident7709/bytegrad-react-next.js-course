import { Toaster } from 'react-hot-toast';

import Logo from './components/Logo';
import Footer from './components/Footer';
import Container from './components/Container';
import Background from './components/Background';
import SearchForm from './components/SearchForm';
import ResultsCount from './components/ResultsCount';
import JobListSearch from './components/JobListSearch';
import Header, { HeaderTop } from './components/Header';
import JobItemContent from './components/JobItemContent';
import BookmarksButton from './components/BookmarksButton';
import Sidebar, { SidebarTop } from './components/Sidebar';
import SortingControls from './components/SortingControls';
import PaginationControls from './components/PaginationControls';

function App() {
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobListSearch />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />

      <Toaster position='bottom-right' />
    </>
  );
}

export default App;
