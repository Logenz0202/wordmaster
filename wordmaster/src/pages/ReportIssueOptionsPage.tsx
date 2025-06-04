import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';

const ReportIssueOptionsPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Thank You!</h1>
      <p>Your issue has been reported successfully. What would you like to do next?</p>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/" className="btn btn-primary me-2">Go to Home</Link>
        <Link to="/report-issue" className="btn btn-secondary">Report Another Issue</Link>
      </div>
    </div>
  );
};

export default ReportIssueOptionsPage;