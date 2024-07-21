import { Route, Routes } from "react-router-dom";
import React from 'react';
import './styles.css';
import Login from './components/session_start';
import Hangman from './components/hangman';
import Highscore from './components/highscore';
import Highscore from './Highscores';
import ScoreList from "./components/recordList";

// import all the sessions we need, using session_set as maybe our start page???
import Session_Start from "./components/session_start.js";


// add this to routes when session works
// <Route path="/" element{<Login/>}/>
const App = () => {
  return (
    <Routes>
      <Route path="/game" element={<Hangman />} />
      <Route path="/highscores" element={<Highscore />} />
    </Routes>
  );
};

export default App;