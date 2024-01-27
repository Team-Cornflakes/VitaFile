import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import FamilyPage from '../pages/FamilyPage';
import TimeLinePage from '../pages/TimeLinePage';
import MainPage from '../pages/MainPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/timeline" element={<TimeLinePage />} />
        <Route path="/Main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
