import React, { useState, useEffect } from 'react';

const Highscore = () => {
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
      <h1>Highscores</h1>
      <ul>
        {highscores.map((entry, index) => (
          <li key={index}>{entry.username}: {entry.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Highscore;
