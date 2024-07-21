import React from 'react';
import { Route, Routes } from "react-router-dom";
import ScoreList from "./recordList";

const Highscore = ({ givenNumberScore }, { onReset }) => {
  return (
    <div>
      <h1>Highscore Screen</h1>
      <p>Congratulations! You've made it to the high score screen.</p>
      <Routes>
       <Route exact path="/" element={<ScoreList givenNumber={givenNumberScore} />} />
     </Routes>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Highscore;
