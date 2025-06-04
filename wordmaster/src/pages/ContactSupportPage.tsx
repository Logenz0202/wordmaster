import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/customStyles.css';
import { useAuth } from '../contexts/AuthContext';

const ContactSupportPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setEmail(currentUser ? currentUser.email || '' : '');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Contact Support</h1>
      {submitted && (
        <div className="alert alert-success alert-blue" role="alert">
          Thank you for your message. You will be sent to home page soon.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Your Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" id="subject" placeholder="Subject" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows={5} placeholder="Your Message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContactSupportPage;