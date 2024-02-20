import React, { useState } from 'react';
import './ChatbotInterface.css';
import microphoneIcon from '../src/assets//mic-4.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

let isRecording = false;
let recognition = null;

const ChatbotInterface = ({ chatInput, updateChatInput }) => {
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Ensure this is set in your .env file
  const genAI = new GoogleGenerativeAI(API_KEY); // Instantiate GoogleGenerativeAI with the API key

  const handleSendMessage = async (message) => {
    setUserMessages(prevMessages => [...prevMessages, message]);
  };

  const handleUserMessage = async (message) => {
    setUserMessages(prevMessages => [...prevMessages, message]);
    setIsLoading(true);

    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Use chatInput as the prompt for the generative AI
      const result = await model.generateContent(message.text);
      const response = await result.response;
      const text = await response.text(); // Get the text content from the response

      // Send bot's response
      setBotMessages(prevMessages => [...prevMessages, { sender: 'bot', text }]);
      
    } catch (error) {
      console.error('Error generating content with Google Generative AI:', error);
      // You can send an error message to the chat as well
      setBotMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "Sorry, I couldn't process that." }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      // Add user's input to messages
      const message = { sender: 'user', text: chatInput };
      handleUserMessage(message);

      // Clear chat input
      updateChatInput('');
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

        const message = { sender: 'user', text: audio };
        handleUserMessage(message); 

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
        {userMessages.map((message, index) => (
          <div key={`user_${index}`} className="message user">
            {message.text}
          </div>
        ))}
        {botMessages.map((message, index) => (
          <div key={`bot_${index}`} className="message bot">
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
      </div>
    </div>
  );
};

export default ChatbotInterface;
