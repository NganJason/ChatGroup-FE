import React, { useContext } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/main.scss'

import { message } from "antd";
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import ProtectedRoute from './Components/CustomRoute/ProtectedRoute';
import AuthRoute from './Components/CustomRoute/AuthRoute';

import { useValidateAuthQuery } from './_shared/queries/chat_group';
import { DataContext } from './_shared/hooks/dataContext';
import { User } from './_shared/apis/chat_group';

function App() {
  const {setUser} = useContext(DataContext)
  const { data: user, isLoading: isValidateAuthLoading } = useValidateAuthQuery({
    onSuccess: (user: User) => {
      if (!user || !user.user_id) {
        setUser({})
      } else {
        setUser(user)
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
  
  return (
    <div className="App">
      {isValidateAuthLoading ? (
        <div>loading</div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<AuthRoute isAuth={!(!user || !user.user_id)} />}>
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
            </Route>
            <Route
              element={<ProtectedRoute isAuth={!(!user || !user.user_id)} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
