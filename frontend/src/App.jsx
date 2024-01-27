import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import FamilyPage from '../pages/FamilyPage';
import TimeLinePage from '../pages/TimeLinePage';
import DocumentPage from '../pages/DocumentPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/timeline" element={<TimeLinePage />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </Router>
  );
}

export default App;