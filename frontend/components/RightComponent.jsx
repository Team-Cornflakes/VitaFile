import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface'; // Adjust the import path as necessary
import './RightComponent.css'; // Import the CSS for styling

const RightComponent = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const handleChatbotClick = () => {
        setShowChatbot(true);
    };

    const handleActualPDFClick = () => {
        setShowChatbot(false);
        // Additional logic for Actual PDF
    };

    const handleSummarizerClick = () => {
        setShowChatbot(false);
        // Additional logic for Summarizer
    };

    return (
        <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '20px' }}>
            {/* Top bar with buttons */}
            <div className="top-bar">
                <button className="top-bar-button" onClick={handleChatbotClick}>
                    Chatbot
                </button>
                <button className="top-bar-button" onClick={handleActualPDFClick}>
                    Actual PDF
                </button>
                <button className="top-bar-button" onClick={handleSummarizerClick}>
                    Summarizer
                </button>
            </div>

            {/* Conditional rendering of the ChatbotInterface */}
            {showChatbot && <ChatbotInterface />}
        </div>
    );
};

export default RightComponent;
