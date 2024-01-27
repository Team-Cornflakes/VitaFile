// RightComponent.jsx

import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface'; // Adjust the import path as necessary
import Summarizer from './Summarizer'; // Import the Summarizer component
import './RightComponent.css'; // Make sure this path is correct

const RightComponent = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
    const [activeComponent, setActiveComponent] = useState('');

    const handleChatbotClick = () => {
        setActiveComponent('chatbot');
    };

    const handleActualPDFClick = () => {
        setActiveComponent('pdf');
        // Additional logic for Actual PDF
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
            {activeComponent === 'pdf' && <div>Actual PDF Component Goes Here</div>}
        </div>
    );
};

export default RightComponent;
