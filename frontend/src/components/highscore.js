import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import ScoreList from "./recordList";

const Highscore = ({ onReset }) => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const response = await fetch('http://localhost:4000/highscores/numLetters');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHighscores(data);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };

    fetchHighscores();
  }, []);

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
