import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './LeftComponent.css';

const LeftComponent = ({ onTextSelect }) => {
  const [data, setData] = useState(null);
  const [frenchData, setFrenchData] = useState(null);
  const [spanishData, setSpanishData] = useState(null);
  const [hindiData, setHindiData] = useState(null);
  const [mandarinData, setMandarinData] = useState(null);
  const [language, setLanguage] = useState('English'); 

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
        setFrenchData(responseData.translated_french);
        setSpanishData(responseData.translated_spanish);
        setHindiData(responseData.translated_hindi);
        setMandarinData(responseData.translated_mandarin);
        setData(responseData.data);

        localStorage.setItem('image_url', responseData.image_url);
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [language]); 

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      onTextSelect(selectedText);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const languageDataMap = {
    English: data,
    French: frenchData,
    Spanish: spanishData,
    Hindi: hindiData,
    Mandarin: mandarinData
  };

  return (
    <div className="left-container" onMouseUp={handleTextSelect}>
      <h1 className="left-container-heading">Electronic Health Record</h1>
      <br></br>
      <hr></hr>
      <br></br>
      
      <div className="language-selection-container">
        <img src="../src/assets/google.png" alt="Translate Icon" className="translate-icon" />
        <span className="translate-text">Translate</span>
        <select onChange={handleLanguageChange} value={language} className="language-select">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Hindi">Hindi</option>
          <option value="Mandarin">Mandarin</option>
        </select>
      </div>
      <ReactMarkdown children={languageDataMap[language]} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default LeftComponent;
