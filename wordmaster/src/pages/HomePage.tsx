import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';

const HomePage: React.FC = () => {
  const handleMultiplayerClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const linkElement = event.currentTarget;
    linkElement.classList.add('flash-red');
    setTimeout(() => {
      linkElement.classList.remove('flash-red');
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <h2>Welcome to WordMaster</h2>
      <p>This is the home page where you can start your journey with WordMaster. Explore the features and enjoy the game!</p>
      
      <div className="mt-5">
        <h3>Game Modes</h3>
        <div className="game-modes">
          <div className="game-mode-block">
            <Link to="/solo-mode" className="game-mode-link">
              <h4>Solo</h4>
              <p>Go solo and master your skills!</p>
            </Link>
          </div>
          <div className="game-mode-block">
            <Link to="/multiplayer" className="game-mode-link" onClick={handleMultiplayerClick}>
              <h4>Multiplayer</h4>
              <p>Challenge friends and players worldwide!</p>
            </Link>
          </div>
          <div className="game-mode-block">
            <Link to="/race-against-time" className="game-mode-link">
              <h4>Race Against Time</h4>
              <p>Beat the clock in this thrilling mode!</p>
            </Link>
          </div>
          <div className="game-mode-block">
            <Link to="/hard-mode" className="game-mode-link">
              <h4>Hard Mode</h4>
              <p>Take on the ultimate challenge!</p>
            </Link>
          </div>
        </div>
        <p className="mt-4">Multiplayer is not here yet, stay tuned.</p>
      </div>
    </div>
  );
};

export default HomePage;