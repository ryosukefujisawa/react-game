import React, { useState, useEffect } from 'react';
import Game from './components/Game';
// import Name from './components/Name';
import './App.css';
import axios from 'axios';
import { response } from 'express';


function App() {
  return (
    <>
      <div className="App">
        <Game />
      </div>
    </>
  );
}

export default App;
