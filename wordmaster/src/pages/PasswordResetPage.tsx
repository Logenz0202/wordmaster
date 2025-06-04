import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email', error);
      setIsSuccess(false);
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      {message && (
        <div className={`alert alert-info ${isSuccess ? 'alert-blue' : ''}`}>
          {message}
        </div>
      )}
      <form onSubmit={handlePasswordReset}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Password Reset Email</button>
      </form>
      <div className="mt-3">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default PasswordResetPage;