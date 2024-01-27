// ChatbotInterface.jsx

import React from 'react';
import './ChatbotInterface.css'; // Make sure to add appropriate CSS

const ChatbotInterface = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action of the Enter key
      handleSendMessage(chatInput); // Use the handleSendMessage function passed from the parent
    }
  };

  return (
    <div className="chatbot-interface">
      <div className="chat-header">Papaji</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <textarea
          value={chatInput}
          onChange={(e) => updateChatInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
          onKeyPress={handleKeyPress}
        ></textarea>
        <button onClick={() => handleSendMessage(chatInput)} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
