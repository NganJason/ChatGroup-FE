import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/main.scss'

import Home from './Components/Home/Home';
import { ShowModalProvider } from './_shared/hooks/showModalContext';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <ShowModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/signup" element={<Auth isSignup={true}/>}/>
          </Routes>
        </BrowserRouter>
        
      </ShowModalProvider>
    </div>
  );
}

export default App;
