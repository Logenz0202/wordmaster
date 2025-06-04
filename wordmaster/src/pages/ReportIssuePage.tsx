import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/customStyles.css';
import { useAuth } from '../contexts/AuthContext';

const ReportIssuePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
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
    setIssueType('');
    setDescription('');

    setTimeout(() => {
      navigate('/report-issue-options');
    }, 2500);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Report an Issue</h1>
      {submitted && (
        <div className="alert alert-success alert-blue" role="alert">
          Issue submitted successfully. Redirecting to the options page...
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="issueType" className="form-label">Issue Type</label>
          <div className="position-relative">
            <select
              className="form-select"
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="">Select the type of your issue</option>
              <option value="bug">Bug</option>
              <option value="feature-request">Feature Request</option>
              <option value="performance">Performance Issue</option>
              <option value="other">Other</option>
            </select>
            <span className="caret-indicator"></span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={5}
            placeholder="Describe the issue in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ReportIssuePage;