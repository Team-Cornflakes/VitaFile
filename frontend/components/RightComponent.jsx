import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface'; // Adjust the import path as necessary

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
            <button style={{ marginBottom: '10px' }} onClick={handleChatbotClick}>
                Chatbot
            </button>
            <button style={{ marginBottom: '10px' }} onClick={handleActualPDFClick}>
                Actual PDF
            </button>
            <button style={{ marginBottom: '10px' }} onClick={handleSummarizerClick}>
                Summarizer
            </button>

            {showChatbot && <ChatbotInterface />}
        </div>
    );
};

export default RightComponent;
