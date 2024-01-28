import React, { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef(null); // Ref for the dropdown to handle outside clicks

  // Hardcoded suggestions
//   const suggestions = [
//     'Profile Settings',
//     'Dashboard Overview',
//     'Logout Procedure',
//     'Help and Support',
//     'User Management',
//     'Anemia',
//     'Bradycardia',
//     'Cyanosis',
//     'Dyspnea',
//     'Edema',
//     'Fibrosis',
//     'Glaucoma',
//     'Hypertension',
//     'Ischemia',
//     'Jaundice',
//     'Ketoacidosis',
//     'Leukopenia',
//     'Myalgia',
//     'Nephropathy',
//     'Osteoporosis',
//     'Pneumonia',
//     'Quadriplegia',
//     'Rheumatoid Arthritis',
//     'Scoliosis',
//     'Tachycardia',
//     'Ulcerative Colitis',
//     'Vasculitis',
//     'Wheeze',
//     'Xerostomia',
// '    Yaws',

//     // ... more suggestions
//   ];

  const [suggestions, setSuggestions] = useState([]);


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if(e.target.value === '') {
      setShowDropdown(false);
      setSuggestions([]);
    } else {
      setShowDropdown(true);
    }
  };

  const handleSearch = () => {
    const url = `http://localhost:8000/ehr/search/?q=${searchInput}`;
    const accessToken = localStorage.getItem("token");

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle the data from the response here
      setSuggestions(data);
    })
    .catch(error => {
      // Handle the error here
      console.error('Error:', error);
    });
  };

  const selectSuggestion = (suggestion) => {
    localStorage.setItem('ehr_id', suggestion['id']);
    navigate('/main');
  };

  const Handleexitnavigation = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    // Clear the suggestions list when the component is mounted
    setSuggestions([]);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

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
        localStorage.setItem('username', name); // Store name in local storage
      } else {
        console.error('Error:', response.status);
      }
    };

    fetchName();
  }, []);

  const formatDate = () => {
    // Date format logic here
  };

  return (
    <header>
      <div className="search-container" ref={dropdownRef}>
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
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion['name']}
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
