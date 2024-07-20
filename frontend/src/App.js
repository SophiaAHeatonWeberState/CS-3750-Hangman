/*import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import RecordList from "./components/recordList";
import Edit from "./components/edit";

 
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
 
export default App;*/

import React, { useState } from 'react';
import './styles.css';
import Highscore from './Highscores';

const words = ["react", "hangman", "javascript", "frontend"];

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHighscore, setShowHighscore] = useState(false);
  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleReset = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setShowHighscore(false);
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => (
      guessedLetters.includes(letter) ? letter : '_'
    )).join(' ');
  };

  const renderAlphabetButtons = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses}
      >
        {letter}
      </button>
    ));
  };

  const isGameOver = wrongGuesses >= maxWrongGuesses;
  const isGameWon = word.split('').every(letter => guessedLetters.includes(letter));

  if (isGameWon) {
    setTimeout(() => {
      setShowHighscore(true);
    }, 2000);
  }

  if (showHighscore) {
    return <Highscore onReset={handleReset} />;
  }

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <p>Word: {renderWord()}</p>
      <p>Wrong guesses: {wrongGuesses}</p>
      <div>{renderAlphabetButtons()}</div>
      {isGameOver && <p>Game Over! The word was: {word}</p>}
      {isGameWon && <p>Congratulations! You've guessed the word!</p>}
      <button onClick={handleReset}>Reset Game</button>
      {isGameOver && <button onClick={() => setShowHighscore(true)}>Go to Highscore</button>}
    </div>
  );
};

export default App;
