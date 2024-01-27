import React from 'react';
import './Header.css'; // Ensure this is the correct path
import searchIcon from '../src/assets/search.png'; 
import messageIcon from '../src/assets/1.png'; 
import alertIcon from '../src/assets/2.png'; 
import exitIcon from '../src/assets/3.png'; 
import logo from '../assets/logo.png'; // Update with the correct path to your logo image
const Header = ({ showLogo }) => {
  const handleSearch = () => {
    // Implement your search functionality here
    console.log("Search initiated");
  };

  const handleExit = () => {
    // Implement your exit/cleanup functionality here
    console.log("User has exited");
  };

  // Feel free to add more handler functions for your message and alert icons

  return (
    <header className="header">
      {showLogo && (
        <div className="header-logo-container">
          <img src={logo} alt="Logo" className="header-logo" />
        </div>
      )}
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button onClick={handleSearch} className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
      <div className="header-actions">
        <button className="icon-button message-icon">
          <img src={messageIcon} alt="Message" />
        </button>
        <button className="icon-button alert-icon">
          <img src={alertIcon} alt="Alert" />
        </button>
        <button className="icon-button exit-icon" onClick={handleExit}>
          <img src={exitIcon} alt="Exit" />
        </button>
      </div>
    </header>
  );
};

export default Header;
