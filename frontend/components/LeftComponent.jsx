import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './LeftComponent.css';

const LeftComponent = ({ onTextSelect }) => {
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState('English'); // State to keep track of the selected language

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const ehrId = localStorage.getItem('ehr_id');

      const response = await fetch(`http://localhost:8000/ehr/get/?ehr_id=${ehrId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json(); 
        setData(responseData.data);
        localStorage.setItem('image_url', responseData.image_url);
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [language]); // Optionally, refetch or update the component based on the selected language

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      onTextSelect(selectedText);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="left-container" onMouseUp={handleTextSelect}>
      <h1 className="left-container-heading">EHR</h1>
      {/* Language Selection Dropdown */}
      <div className="language-selection-container">
        <select onChange={handleLanguageChange} value={language} className="language-select">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Hindi">Hindi</option>
          <option value="Mandarin">Mandarin</option>
        </select>
      </div>
      <ReactMarkdown children={data} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default LeftComponent;
