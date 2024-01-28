import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Importing the CSS file
import searchIcon from '../src/assets/search.png';
import messageIcon from '../src/assets/1.png';
import alertIcon from '../src/assets/2.png';
import exitIcon from '../src/assets/3.png';

const Header = ({ toggleSidebar }) => {
  const [personName, setPersonName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Hardcoded suggestions
  const suggestions = [
    'Profile Settings',
    'Dashboard Overview',
    'Logout Procedure',
    'Help and Support',
    'User Management',
    'Profile Set',
    'Dashboard aaja',
    'Dashboard Over',
    'Logout Proc',
    'Help and Supp',
    'User Managet',
    'Dashboard aaj'
    // ... more suggestions
  ];

  const handleSearchChange = (e) => {
    console.log("Search input changed:", e.target.value); // Debugging log
    setSearchInput(e.target.value);
    setShowDropdown(e.target.value !== '');
};

  const handleSearch = () => {
    console.log("Search initiated");
    // Add search logic here
  };

  const Handleexitnavigation = () => {
    localStorage.clear();  
    navigate('/');
  };

  useEffect(() => {
    const fetchName = async () => {
      const token = localStorage.getItem('token');  

      const response = await fetch('http://localhost:8000/getuser/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        let name = await response.text();
        name = name.replace(/"/g, ''); // Remove quotes
        setPersonName(name);
      } else {
        console.error('Error:', response.status);
      }
    };

    fetchName();
  }, []);

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch} className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
        {showDropdown && (
          <div className="search-dropdown">
            {suggestions.filter(suggestion =>
              suggestion.toLowerCase().includes(searchInput.toLowerCase())
            ).map((suggestion, index) => (
              <div key={index} className="dropdown-item">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="person-name-container">
        <span className="person-name">{personName}</span>
      </div>
      <div className="header-right">
        <span className="date-display">{formatDate()}</span>
        <button className="icon-button message-icon">
          <img src={messageIcon} alt="Message" />
        </button>
        <button className="icon-button alert-icon">
          <img src={alertIcon} alt="Alert" />
        </button>
        <button className="icon-button exit-icon" onClick={Handleexitnavigation}>
          <img src={exitIcon} alt="Exit" />
        </button>
      </div>
    </header>
  );
};

export default Header;
