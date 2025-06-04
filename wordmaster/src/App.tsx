import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PasswordResetPage from './pages/PasswordResetPage';
import SoloClassicPage from './pages/SoloClassicPage';
import MultiplayerClassicPage from './pages/MultiplayerClassicPage';
import TimeBasedPage from './pages/TimeBasedPage';
import HardModePage from './pages/HardModePage';
import FAQPage from './pages/FAQPage';
import UserGuidePage from './pages/UserGuidePage';
import ContactSupportPage from './pages/ContactSupportPage';
import ReportIssuePage from './pages/ReportIssuePage';
import ReportIssueOptionsPage from './pages/ReportIssueOptionsPage';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/reset-password" element={<PasswordResetPage />} />
              <Route path="/solo-mode" element={<SoloClassicPage />} />
              <Route path="/multiplayer" element={<MultiplayerClassicPage />} />
              <Route path="/race-against-time" element={<TimeBasedPage />} />
              <Route path="/hard-mode" element={<HardModePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/user-guide" element={<UserGuidePage />} />
              <Route path="/contact-support" element={<ContactSupportPage />} />
              <Route path="/report-issue" element={<ReportIssuePage />} />
              <Route path="/report-issue-options" element={<ReportIssueOptionsPage />} />
            </Routes>
            <Footer />
          </div>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;