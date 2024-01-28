import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface'; // Adjust the import path as necessary
import Summarizer from './Summarizer'; // Import the Summarizer component
import './RightComponent.css'; // Make sure this path is correct

const RightComponent = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
  const [activeComponent, setActiveComponent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state variable for the image URL

  const handleChatbotClick = () => {
    setActiveComponent('chatbot');
  };

    const handleActualPDFClick = () => {
        setActiveComponent('pdf');
        const imageUrl = localStorage.getItem('image_url'); // Fetch the image URL from local storage
        const staticPath = '/static/'; // Replace with your actual static file path
        setImageUrl(staticPath + imageUrl); // Prepend the static path to the image URL and set it to the state
    };

    const handleSummarizerClick = () => {
        setActiveComponent('summarizer');
        // Additional logic for Summarizer
    };

    return (
        <div className="right-container">
            <div className="button-container">
                <button className="top-bar-button" onClick={handleChatbotClick}>
                    Chatbot
                </button>
                <button className="top-bar-button" onClick={handleActualPDFClick}>
                    Actual Report
                </button>
                <button className="top-bar-button" onClick={handleSummarizerClick}>
                    Summarizer
                </button>
            </div>

            {activeComponent === 'chatbot' && (
                <ChatbotInterface 
                    chatInput={chatInput} 
                    updateChatInput={updateChatInput} 
                    messages={messages} 
                    handleSendMessage={handleSendMessage} 
                />
            )}
            {activeComponent === 'summarizer' && <Summarizer />}
            {activeComponent === 'pdf' && <img src={imageUrl} alt="PDF" />}
        </div>
    );
};

export default RightComponent;
