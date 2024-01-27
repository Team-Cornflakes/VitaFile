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
        handleSendMessage(text); // Send the message directly
    };

    // Function to handle sending messages
    const handleSendMessage = (text) => {
        if (text.trim()) {
            setMessages([...messages, { text: text, sender: 'user' }]); // Add the new message to the messages array
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
