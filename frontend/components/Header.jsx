import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Importing the CSS file
import searchIcon from '../src/assets/search.png'; 
import messageIcon from '../src/assets/1.png'; 
import alertIcon from '../src/assets/2.png'; 
import exitIcon from '../src/assets/3.png'; 

const Header = ({ toggleSidebar }) => {
  const handleSearch = () => {
    // Logic to handle search functionality
    console.log("Search initiated");
  };

  const navigate = useNavigate();

  const Handleexitnavigation = () => {
    localStorage.removeItem('token');  
    navigate('/');
  };

  // Function to format the current date
  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const personName = "John Doe"; // Replace with dynamic data if needed

  return (
    <header>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button onClick={handleSearch} className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
      <div className="person-name-container"> {/* New div for person's name */}
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
