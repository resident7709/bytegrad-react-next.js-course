import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App.tsx';
import JobItemsContextProvider from './contexts/JobItemContextProvider.tsx';
import ActiveIdContextProvider from './contexts/ActiveIdContextProvider.tsx';
import BookmarksContextProvider from './contexts/BookmarksContextProvider.tsx';
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
