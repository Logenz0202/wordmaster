import React, { useState, useEffect, useCallback, useRef } from 'react';
import wordList from '../wordlists/baseWordList';
import Modal from '../components/Modal';
import Keyboard from '../components/Keyboard';
import '../styles/customStyles.css';

const TimeBasedPage: React.FC = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<string[][]>(Array(5).fill(['', '', '', '']));
  const [correctLetters, setCorrectLetters] = useState<string[]>(Array(5).fill(''));
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [keyStatus, setKeyStatus] = useState<{ [key: string]: string }>({});
  const [disqualifiedLetters, setDisqualifiedLetters] = useState<Array<Set<string>>>(
    Array.from({ length: 5 }, () => new Set<string>())
  );

  const wordRef = useRef<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordRef.current = randomWord;
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setMessage(`Time's up! The word was ${wordRef.current}.`);
      setShowModal(true);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  const isWordValid = (word: string): boolean => {
    return wordList.includes(word.toLowerCase());
  };

  const displayTemporaryMessage = (msg: string) => {
    setMessage(msg);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setMessage('');
      }, 2500);
    }, 1000);
  };

  const updateKeyStatus = useCallback((guess: string) => {
    const newKeyStatus = { ...keyStatus };
    const newHints = hints.map((arr) => [...arr]);
    const newCorrectLetters = [...correctLetters];
    const newDisqualified = disqualifiedLetters.map((set) => new Set(set));

    for (let i = 0; i < 5; i++) {
      const guessLetter = guess[i] ? guess[i].toUpperCase() : '';
      const answerLetter = wordRef.current[i].toUpperCase();

      if (guessLetter === answerLetter) {
        newCorrectLetters[i] = guessLetter;
        newHints[i] = Array(4).fill('');
        newKeyStatus[guessLetter] = 'correct';
      } else {
        if (guessLetter) {
          newDisqualified[i].add(guessLetter);
          newHints[i] = newHints[i].map((letter) => (letter === guessLetter ? '' : letter));
        }
      }
    }

    for (let j = 0; j < 5; j++) {
      const guessLetter = guess[j] ? guess[j].toUpperCase() : '';
      const answerLetter = wordRef.current[j].toUpperCase();
      if (guessLetter && guessLetter !== answerLetter) {
        if (wordRef.current.toLowerCase().includes(guessLetter.toLowerCase())) {
          if (newKeyStatus[guessLetter] !== 'correct') {
            newKeyStatus[guessLetter] = 'present';
          }
          for (let i = 0; i < 5; i++) {
            if (i !== j && !newCorrectLetters[i]) {
              if (!newDisqualified[i].has(guessLetter)) {
                if (!newHints[i].includes(guessLetter)) {
                  const emptyIndex = newHints[i].findIndex((cell) => cell === '');
                  if (emptyIndex !== -1) {
                    newHints[i][emptyIndex] = guessLetter;
                  }
                }
              }
            }
          }
        } else {
          if (newKeyStatus[guessLetter] !== 'correct' && newKeyStatus[guessLetter] !== 'present') {
            newKeyStatus[guessLetter] = 'absent';
          }
        }
      }
    }

    setKeyStatus(newKeyStatus);
    setHints(newHints);
    setCorrectLetters(newCorrectLetters);
    setDisqualifiedLetters(newDisqualified);
  }, [keyStatus, hints, correctLetters, disqualifiedLetters]);

  const handleGuess = useCallback(() => {
    if (guess.length !== 5) {
      displayTemporaryMessage('Guess must be a 5-letter word.');
      return;
    }

    if (!isWordValid(guess)) {
      displayTemporaryMessage("This word doesn't exist in the list.");
      return;
    }

    const newGuesses = [...guesses, guess.toUpperCase()];
    setGuesses(newGuesses);
    updateKeyStatus(guess);

    if (guess.toLowerCase() === wordRef.current.toLowerCase()) {
      setShowModal(true);
      setMessage(`Congratulations! You guessed the word: ${wordRef.current}`);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    setGuess('');
  }, [guess, guesses, updateKeyStatus]);

  const handleSubmit = useCallback(() => {
    handleGuess();
  }, [handleGuess]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        handleSubmit();
      } else if (key === 'BACKSPACE') {
        setGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && guess.length < 5) {
        setGuess((prev) => prev + key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, guess]);

  const handlePlayAgain = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordRef.current = randomWord;
    setGuesses([]);
    setHints(Array(5).fill(['', '', '', '']));
    setCorrectLetters(Array(5).fill(''));
    setMessage('');
    setShowModal(false);
    setKeyStatus({});
    setTimeLeft(60);
    setDisqualifiedLetters(Array.from({ length: 5 }, () => new Set<string>()));
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Enter') {
      handleSubmit();
    } else if (key === 'Backspace') {
      setGuess(guess.slice(0, -1));
    } else if (guess.length < 5) {
      setGuess(guess + key);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Guess the 5-letter word within 60 seconds</h2>
      <div>Time left: {timeLeft} seconds</div>
      {message && (
        <div className={`alert alert-info ${fadeOut ? 'fade-out' : ''}`}>
          {message}
        </div>
      )}
      <div className="timed-mode-grid">
        <div className="timed-mode-row">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div key={colIndex} className="timed-mode-cell">
              {guess[colIndex]}
            </div>
          ))}
        </div>
        <div className="timed-mode-row">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div key={colIndex} className={`timed-mode-cell ${correctLetters[colIndex] ? 'timed-mode-correct' : ''}`}>
              {correctLetters[colIndex] ? (
                correctLetters[colIndex]
              ) : (
                <div className="timed-mode-mini-grid">
                  {hints[colIndex].map((hint, hintIndex) => (
                    <div key={hintIndex} className={`timed-mode-mini-cell ${hint ? 'timed-mode-present' : ''}`}>
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Keyboard onKeyPress={handleKeyPress} keyStatus={keyStatus} />
      <Modal
        show={showModal}
        message={message}
        guesses={guesses.length}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
};

export default TimeBasedPage;