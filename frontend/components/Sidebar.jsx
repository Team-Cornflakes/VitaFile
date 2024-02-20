import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../src/assets/logo_black.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const navigateToFamily = () => {
    navigate('/family');
  };

  const navigateToTimeline = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8000/ehr/fetch_current/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      navigate('/timeline');
    } else {
    }
  };

  const navigateToDocument = () => {
    navigate('/document');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="sidebar-menu">
        <p className="menu-heading">MENU</p>
        <button className="menu-item dashboard" onClick={navigateToFamily}>Family Page</button>
        <button className="menu-item records" onClick={navigateToTimeline}>Timeline</button>
      </div>
      <div className="sidebar-general">
        <p className="menu-heading">GENERAL</p>
        <button className="menu-item settings">Settings</button>
        <button className="menu-item support">Support</button>
      </div>
    </aside>
  );
};

export default Sidebar;