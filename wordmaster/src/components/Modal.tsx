import React from 'react';
import { Link } from 'react-router-dom';

interface ModalProps {
  show: boolean;
  message: string;
  guesses: number;
  onPlayAgain: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, guesses, onPlayAgain }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Game Over</h5>
            </div>
            <div className="modal-body">
              <p>{message}</p>
              <p>Number of guesses: {guesses}</p>
            </div>
            <div className="modal-footer">
              <Link to="/" className="btn btn-secondary">
                Home
              </Link>
              <button type="button" className="btn btn-primary" onClick={onPlayAgain}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;