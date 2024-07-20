import React from 'react';

const Highscore = ({ onReset }) => {
  return (
    <div>
      <h1>Highscore Screen</h1>
      <p>Congratulations! You've made it to the high score screen.</p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Highscore;
