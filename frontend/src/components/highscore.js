import React, { useState, useEffect } from 'react';
import RecordList from "./recordList";
import { Route, Routes } from "react-router-dom";

const Highscore = ({ onReset }) => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const response = await fetch('/Highscores');
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
       <Route exact path="/" element={<RecordList />} />
     </Routes>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Highscore;
