import React, { useState } from 'react';
import './ChatbotInterface.css';

const ChatbotInterface = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsLoading(true);
      // Add user's input to messages
      handleSendMessage({ sender: 'user', text: chatInput });
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: chatInput,
          max_tokens: 60
        })
      });
      const data = await response.json();

      console.log(data); // Log the response data

      if (!data.choices || data.choices.length === 0) {
        console.error('No choices returned from API:', data);
        setIsLoading(false);
        return;
      }
      
      handleSendMessage({ sender: 'ai', text: data.choices[0].text });
      // Clear chat input
      updateChatInput('');
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-interface">
      <div className="chat-header">VitaFile Chatbot</div>
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
        <button onClick={() => handleSendMessage({ sender: 'user', text: chatInput })} className="send-button" disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotInterface;