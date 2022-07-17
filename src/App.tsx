import React from 'react';
import './App.css';
import './styles/main.scss'

import Home from './Components/Home/Home';
import { ShowModalProvider } from './_shared/hooks/showModalContext';

function App() {
  return (
    <div className="App">
      <ShowModalProvider>
        <Home></Home>
      </ShowModalProvider>
    </div>
  );
}

export default App;
