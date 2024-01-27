// RightSection.js
import React from 'react';
import ChatbotInterface from './ChatbotInterface'; // Ensure correct path
import './DocumentViewer.css'
const RightSection = ({ pdfUrl, selectedOption, handleOptionChange }) => {
  return (
    <div className="tright-section">
      <div className="toptions">
        <button className="toption" onClick={() => handleOptionChange('chatbot')}>Chatbot</button>
        <button className="toption" onClick={() => handleOptionChange('report')}>Actual PDF</button>
        <button className="toption" onClick={() => handleOptionChange('summarizer')}>Summarizer</button>
      </div>
      <div className="content">
        {selectedOption === 'chatbot' && <ChatbotInterface />}
        {selectedOption === 'report' && (
          <iframe className="tcontent-frame" src={pdfUrl} title="Actual Report" frameBorder="0"></iframe>
        )}
        {selectedOption === 'summarizer' && (
          <div className="summarizer-content">
            <p>This is the summarizer content.</p>
            {/* Implement your summarizer content or component here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;
