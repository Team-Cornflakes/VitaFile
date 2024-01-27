import React, { useState } from 'react';
import './ChatbotInterface.css'; // Make sure to add appropriate CSS

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput(''); // Clear input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action of the Enter key
      handleSendMessage();
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
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="chat-input"
          onKeyPress={handleKeyPress}
          // Adjusted style for better visibility
          style={{ minHeight: '10px', maxHeight: '100px', width: 'calc(100% - 20px)' }}
        ></textarea>
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
