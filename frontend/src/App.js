import { Route, Routes } from "react-router-dom";
import React from 'react';
import './styles.css';
import Login from './components/session_start';
import Hangman from './components/hangman';
import Highscore from './components/highscore';
import ScoreList from "./components/recordList";

// add this to routes when session works
// <Route path="/" element{<Login/>}/>
const App = () => {
  return (
    <Routes>
      <Route path="/game" element={<Hangman />} />
      <Route path="/highscores" element={<Highscore />} />
      <Route path="/session_start" element={<Login />} />
    </Routes>
  );
};

export default App;