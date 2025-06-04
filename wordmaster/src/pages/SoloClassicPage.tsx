import React, { useState, useEffect, useCallback } from 'react';
import wordList from '../wordlists/baseWordList';
import Modal from '../components/Modal';
import Keyboard from '../components/Keyboard';
import '../styles/customStyles.css';

const SoloClassicPage: React.FC = () => {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [keyStatus, setKeyStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(randomWord);
  }, []);

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
    guess.split('').forEach((letter, index) => {
      if (word[index] === letter.toLowerCase()) {
        newKeyStatus[letter.toUpperCase()] = 'correct';
      } else if (word.includes(letter.toLowerCase())) {
        newKeyStatus[letter.toUpperCase()] = 'present';
      } else {
        newKeyStatus[letter.toUpperCase()] = 'absent';
      }
    });
    setKeyStatus(newKeyStatus);
  }, [keyStatus, word]);

  const handleGuess = useCallback(() => {
    if (guess.length !== 5) {
      displayTemporaryMessage('Guess must be a 5-letter word.');
      return;
    }

    if (!isWordValid(guess)) {
      displayTemporaryMessage('This word doesn\'t exist in the list.');
      return;
    }

    const newGuesses = [...guesses, guess.toUpperCase()];
    setGuesses(newGuesses);
    updateKeyStatus(guess);

    if (guess.toLowerCase() === word.toLowerCase()) {
      setShowModal(true);
      setMessage(`Congratulations! You guessed the word: ${word}`);
    } else if (newGuesses.length === 6) {
      setShowModal(true);
      setMessage(`Game over! The word was ${word}.`);
    }

    setGuess('');
  }, [guess, guesses, word, updateKeyStatus]);

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
    setWord(randomWord);
    setGuesses([]);
    setMessage('');
    setShowModal(false);
    setKeyStatus({});
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

  const getLetterClass = (letter: string, index: number, isCurrentRow: boolean) => {
    if (isCurrentRow) return '';
    if (word[index] === letter.toLowerCase()) {
      return 'correct';
    } else if (word.includes(letter.toLowerCase())) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  return (
    <div className="container mt-5">
      <h2>You have 6 chances to guess a 5-letter word</h2>
      {message && !showModal && (
        <div className={`alert alert-info ${fadeOut ? 'fade-out' : ''}`}>
          {message}
        </div>
      )}
      <div className="grid mt-4">
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div key={rowIndex} className={`grid-row ${rowIndex === guesses.length ? 'active-row' : ''}`}>
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] || (rowIndex === guesses.length ? guess[colIndex] : '');
              const isCurrentRow = rowIndex === guesses.length;
              return (
                <div key={colIndex} className={`grid-cell ${letter ? getLetterClass(letter, colIndex, isCurrentRow) : ''}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
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

export default SoloClassicPage;