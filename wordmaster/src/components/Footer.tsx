import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/customStyles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <ul>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/user-guide">User Guide</Link></li>
          <li><Link to="/contact-support">Contact Support</Link></li>
          <li><Link to="/report-issue">Report a Bug</Link></li>
        </ul>
      </div>
      <p>&copy; 2025 WordMaster. All rights reserved.</p>
    </footer>
  );
};

export default Footer;