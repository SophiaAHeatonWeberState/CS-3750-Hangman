import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './styles.css';
import Highscore from './Highscores';
import RecordList from "./components/recordList";

const words = ["react", "hangman", "javascript", "frontend"];

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [showHighscore, setShowHighscore] = useState(false);
  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || incorrectLetters.includes(letter)) return;

    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
      setIncorrectLetters([...incorrectLetters, letter]);
    }
  };

  const handleReset = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setIncorrectLetters([]);
    setCurrentGuess('');
    setShowHighscore(false);
  };

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentGuess.length === 1) {
      handleGuess(currentGuess.toLowerCase());
      setCurrentGuess('');
    }
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => (
      guessedLetters.includes(letter) ? letter : '_'
    )).join(' ');
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
      <p>Incorrect letters: {incorrectLetters.join(', ')}</p>
      <input
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        maxLength="1"
      />
      {isGameOver && <p>Game Over! The word was: {word}</p>}
      {isGameWon && <p>Congratulations! You've guessed the word!</p>}
      <button onClick={handleReset}>Reset Game</button>
      {isGameOver && <button onClick={() => setShowHighscore(true)}>Go to Highscore</button>}
    </div>
  );
};

export default App;
