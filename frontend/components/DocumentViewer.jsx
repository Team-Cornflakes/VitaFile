import React, { useState } from 'react';
import Header from './Header';
import ChatbotInterface from './ChatbotInterface'; // Ensure correct path
import './DocumentViewer.css'; // Ensure CSS file exists

const DocumentViewer = ({ pdfUrl }) => {
  const [selectedOption, setSelectedOption] = useState('chatbot');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="tdocument-viewer">
      <div className="tleft-section">
        <iframe
          className="tpdf-document"
          src={pdfUrl}
          title="PDF Document"
          frameBorder="0"
        ></iframe>
      </div>
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
    </div>
  );
};

export default DocumentViewer;
