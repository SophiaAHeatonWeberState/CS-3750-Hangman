import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
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
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [showHighscore, setShowHighscore] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const maxWrongGuesses = 6;

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const response = await fetch('http://localhost:4000/random-word');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWord(data.word);
      } catch (error) {
        console.error("Error fetching the word:", error);
      }
    };

    fetchRandomWord();
  }, []);

  useEffect(() => {
    const gameOver = wrongGuesses >= maxWrongGuesses;
    const gameWon = word.split('').every(letter => guessedLetters.includes(letter));

    setIsGameOver(gameOver);
    setIsGameWon(gameWon);

    if (gameWon) {
      const timeoutId = setTimeout(() => {
        setShowHighscore(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }

    if (gameOver) {
      setShowHighscore(false);
    }
  }, [word, guessedLetters, wrongGuesses]);

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
    setWord('');
    setGuessedLetters([]);
    setWrongGuesses(0);
    setIncorrectLetters([]);
    setCurrentGuess('');
    setShowHighscore(false);
    setIsGameOver(false);
    setIsGameWon(false);
    const fetchRandomWord = async () => {
      try {
        const response = await fetch('http://localhost:4000/random-word');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWord(data.word);
      } catch (error) {
        console.error("Error fetching the word:", error);
      }
    };
    fetchRandomWord();
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
