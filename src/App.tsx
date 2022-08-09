import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/main.scss'

import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import ProtectedRoute from './Components/CustomRoute/ProtectedRoute';
import AuthRoute from './Components/CustomRoute/AuthRoute';

import { useValidateAuthQuery } from './_shared/queries/chat_group';
import { DataContext } from './_shared/hooks/dataContext';
import { eventType, User } from './_shared/apis/chat_group';
import { closeSocket, getSocket } from './_shared/apis/chat_group_socket';

function App() {
  const {setUser, addMessage} = useContext(DataContext)
  const { data: user, isLoading: isValidateAuthLoading } = useValidateAuthQuery({
    onSuccess: (user: User) => {
      if (!user || !user.user_id) {
        setUser({})

        let path = window.location.pathname

        if (path !== "/signup" && path !== "/login") {
          
        }
      } else {
        setUser(user)
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!user || !user.user_id) {
      closeSocket()
    } else {
      let client = getSocket();

      if (client) {
        client.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());

          switch(data.event_type) {
            case eventType.SERVER_EVENT: {
              console.log(data.message)
              break;
            }
            case eventType.CLIENT_SEND_MSG_EVENT: {
              addMessage(data.message.channel_id, data.message)
              break;
            }
            default: {
              break;
            }
          }
        };
      }
    }
  }, [user])
  
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
