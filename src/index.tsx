import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { DataProvider } from './_shared/hooks/dataContext';
import { ShowModalProvider } from './_shared/hooks/showModalContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <ShowModalProvider>
          <App />
        </ShowModalProvider>
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);