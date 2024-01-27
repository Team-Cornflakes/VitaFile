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
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="chat-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
