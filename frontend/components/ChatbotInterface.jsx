import React, { useState } from 'react';
import './ChatbotInterface.css';
import microphoneIcon from '../src/assets//mic-4.png';


let isRecording = false;
let recognition = null;

const ChatbotInterface = ({ chatInput, updateChatInput, messages, handleSendMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const [message, setMessages] = useState([
    {
      role: "system",
      content: "You are now a medical expert"
    }
  ]);

    
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsLoading(true);
      // Add user's input to messages
      handleSendMessage({ sender: 'user', text: chatInput });
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { "role": "user", "content": chatInput }
          ],
          temperature: 0.7,
        })
      });
      const data = await response.json();

      console.log(data); // Log the response data

      if (!data.choices || data.choices.length === 0) {
        console.error('No choices returned from API:', data);
        setIsLoading(false);
        return;
      }
      const botMessage = data.choices[0].message.content;

      handleSendMessage({ sender: 'bot', text: botMessage });
      // Clear chat input
      updateChatInput('');
      setIsLoading(false);
    }
  };

  const handleMicrophoneClick = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!isRecording) {
      recognition = new SpeechRecognition();
      const microphoneButton = document.getElementById('microphone-button');
      microphoneButton.style.backgroundColor = 'red';

      recognition.onresult = async (event) => {
        const audio = event.results[0][0].transcript;

        handleSendMessage({ sender: 'user', text: audio }); 

        microphoneButton.style.backgroundColor = 'lightskyblue';
      };

      recognition.start();
      isRecording = true;
    } else {
      recognition.stop();
      isRecording = false;
      document.getElementById('microphone-button').style.backgroundColor = 'lightskyblue';
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
        <button id="microphone-button" onClick={handleMicrophoneClick} className="microphone-button" disabled={isLoading}>
          <img src={microphoneIcon} alt="Microphone" />
        </button>
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