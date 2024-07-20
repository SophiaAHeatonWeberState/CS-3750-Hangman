import { Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import './styles.css';
import Highscore from './Highscores';
import RecordList from "./components/recordList";

// import all the sessions we need, using session_set as maybe our start page???
import Session_Set from "./components/session_set.js";
import Session_Delete from "./components/session_delete.js";


const words = ["react", "hangman", "javascript", "frontend"];

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
 return (
   <div>
    <h1>Hello World</h1>
     <Routes>
       <Route exact path="/" element={<RecordList />} />
     </Routes>
   </div>
 );
};

export default App;
