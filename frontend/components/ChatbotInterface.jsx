import React, { useState } from 'react';
import './ChatbotInterface.css';
import microphoneIcon from '../src/assets/mic-4.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

let isRecording = false;
let recognition = null;
const token = localStorage.getItem('token');

const ChatbotInterface = ({ chatInput, updateChatInput }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleUserMessage({ text: chatInput });
      updateChatInput('');
    }
  };

  const addMessage = (sender, text) => {
    setMessages(prevMessages => [...prevMessages, { sender, text }]);
  };

  const handleUserMessage = async (message) => {
    addMessage('user', message.text);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message.text);
      const response = await result.response;
      const text = await response.text();

      addMessage('bot', text);

      // Create a new speech synthesis utterance
      // Fetch the synthesized speech audio file from the server
      fetch('http://localhost:8000/synthesize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text }) // Send the text to the server
      })
      .then(response => response.blob()) // Get the response as a Blob
      .then(audioBlob => {
        // Create a new audio object and play it
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
        console.error('Error generating content with Google Generative AI:', error);
        addMessage('bot', "Sorry, I couldn't process that. Error: " + error.message);
      }

    setIsLoading(false);
  };

  const handleMicrophoneClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!isRecording) {
      recognition = new SpeechRecognition();
      const microphoneButton = document.getElementById('microphone-button');
      microphoneButton.style.backgroundColor = 'red';

      recognition.onresult = (event) => {
        const audio = event.results[0][0].transcript;
        handleUserMessage({ text: audio });
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
          <div key={`${message.sender}_${index}`} className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}>
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
