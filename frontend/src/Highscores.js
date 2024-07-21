import React from 'react';
import ScoreList from "./components/recordList";
import { Route, Routes } from "react-router-dom";

const Highscore = ({ onReset }) => {
  return (
    <div>
      <h1>Highscore Screen</h1>
      <p>Congratulations! You've made it to the high score screen.</p>
      <Routes>
       <Route exact path="/" element={<ScoreList />} />
      </Routes>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Highscore;
