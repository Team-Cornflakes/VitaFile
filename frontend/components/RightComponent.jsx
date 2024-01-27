import React, { useState } from 'react';
import './RightComponent.css'; // Make sure this path is correct

const RightComponent = () => {
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
            <div className="button-container"> {/* Class added for styling */}
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

            {/* Conditional rendering based on activeComponent */}
            {activeComponent === 'chatbot' && <div>Chatbot Component</div>}
            {activeComponent === 'summarizer' && <div>Summarizer Component</div>}
            {activeComponent === 'pdf' && <div>Actual PDF Component</div>}
        </div>
    );
};

export default RightComponent;
