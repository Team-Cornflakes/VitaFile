import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface';
import Summarizer from './Summarizer';
import './RightComponent.css';

const RightComponent = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
    const [activeComponent, setActiveComponent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleChatbotClick = () => {
        setActiveComponent('chatbot');
    };

    const handleActualPDFClick = () => {
        setActiveComponent('pdf');
        const imageUrl = localStorage.getItem('image_url');
        const staticPath = 'http://localhost:8000/static';
        setImageUrl(staticPath + imageUrl);
    };

    const handleSummarizerClick = () => {
        setActiveComponent('summarizer');
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

            <div className="scrollable-content">
                {activeComponent === 'chatbot' && (
                    <ChatbotInterface 
                        chatInput={chatInput} 
                        updateChatInput={updateChatInput} 
                        messages={messages} 
                        handleSendMessage={handleSendMessage} 
                    />
                )}
                {activeComponent === 'summarizer' && <Summarizer />}
                {activeComponent === 'pdf' && (
                    <div className="image-container">
                        <img src={imageUrl} alt="PDF" className="pdf-image" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightComponent;