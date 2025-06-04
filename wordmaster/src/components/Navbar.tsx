import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/customStyles.css';

const Navbar: React.FC = () => {
  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span className="word-yellow">Word</span><span className="word-green">Master</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link" id="themeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Theme
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
                <li><button className="dropdown-item" onClick={() => changeTheme('light')}>Light</button></li>
                <li><button className="dropdown-item" onClick={() => changeTheme('dark')}>Dark</button></li>
                <li><button className="dropdown-item" onClick={() => changeTheme('high-contrast')}>High Contrast</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;