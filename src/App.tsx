import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/main.scss'

import { message } from "antd";
import Home from './Components/Home/Home';
import { ShowModalProvider } from './_shared/hooks/showModalContext';
import Auth from './Components/Auth/Auth';
import ProtectedRoute from './Components/CustomRoute/ProtectedRoute';
import AuthRoute from './Components/CustomRoute/AuthRoute';

import { useValidateAuthQuery } from './_shared/queries/chat_group';
import { DataProvider } from './_shared/hooks/dataContext';


function App() {
  const { data: isAuth, isLoading: isValidateAuthLoading } = useValidateAuthQuery({
    onError: (err: any): void => {
      message.error(err.message);
    },
  });
  
  return (
    <div className="App">
      <DataProvider>
        <ShowModalProvider>
          {isValidateAuthLoading ? (
            <div>loading</div>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route element={<AuthRoute isAuth={isAuth || false} />}>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/signup" element={<Auth />} />
                </Route>
                <Route element={<ProtectedRoute isAuth={isAuth || false} />}>
                  <Route path="/" element={<Home />} />
                </Route>
              </Routes>
            </BrowserRouter>
          )}
        </ShowModalProvider>
      </DataProvider>
    </div>
  );
}

export default App;
