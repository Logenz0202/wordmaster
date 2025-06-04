import React from 'react';
import '../styles/customStyles.css';

const UserGuidePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Guide</h1>
      <div className="accordion" id="userGuideAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Getting Started
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#userGuideAccordion">
            <div className="accordion-body">
              <p>Welcome to WordMaster! This guide will help you get started with the game.</p>
              <ul>
                <li>Step 1: Register an account or log in if you already have one.</li>
                <li>Step 2: Navigate to the home page to select a game mode.</li>
                <li>Step 3: Follow the on-screen instructions to play the game.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Game Modes
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#userGuideAccordion">
            <div className="accordion-body">
              <p>WordMaster offers several game modes:</p>
              <ul>
                <li><b>Solo</b>: Play by yourself and try to guess the word within the given attempts.</li>
                <li><b>Multiplayer</b>: Challenge your friends and see who can guess the word first.</li>
                <li><b>Race Against Time</b>: Guess the within a time limit but unlimited tries.</li>
                <li><b>Hard</b>: Just like the classic solo, except you must use all available hints.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Scoring and Rewards
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#userGuideAccordion">
            <div className="accordion-body">
              <p>Learn how scoring works and what rewards you can earn:</p>
              <ul>
                <li>Points are awarded based on the number of attempts taken to guess the word.</li>
                <li>Bonus points are given for streaks of correct guesses.</li>
                <li>Earn badges and achievements for reaching milestones.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Tips and Tricks
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#userGuideAccordion">
            <div className="accordion-body">
              <p>Improve your gameplay with these tips and tricks:</p>
              <ul>
                <li>Start with common vowels and consonants to narrow down the possibilities.</li>
                <li>Pay attention to the hints provided after each guess.</li>
                <li>Practice regularly to improve your word-guessing skills.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;