// MainPage.jsx

import React, { useState } from 'react';
import Header1 from '../components/Header1';
import LeftComponent from '../components/LeftComponent';
import RightComponent from '../components/RightComponent';
import './MainPage.css';

const MainPage = () => {
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]); // State to manage messages

    // Function to handle when text is copied or selected
    const handleTextSelectOrCopy = (text) => {
        setChatInput(text); // Set the chat input
        handleSendMessage({ sender: 'user', text }); // Send the message directly
    };

    // Function to handle sending messages
    // Function to handle sending messages
    const handleSendMessage = (message) => {
        if (typeof message.text !== 'string') {
            console.error('Message text must be a string:', message.text);
            return;
        }

        if (message.text.trim()) {
            setMessages([...messages, message]); // Add the new message to the messages array
            setChatInput(''); // Clear the chat input field
        }
    };

    return (
        <div className="main-page">
            <Header1 />
            <div className="content">
                <LeftComponent onTextSelect={handleTextSelectOrCopy} />
                <RightComponent 
                    chatInput={chatInput} 
                    updateChatInput={setChatInput} 
                    messages={messages} 
                    handleSendMessage={handleSendMessage} 
                />
            </div>
        </div>
    );
};

export default MainPage;