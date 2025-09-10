import React, { useState } from 'react';
import { useAIHelp } from '../../hooks/useAIHelp';

const AITutorPage = () => {
  const { isAIAssistantOpen, openAIAssistant, closeAIAssistant } = useAIHelp();
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'ai' },
    { text: 'I have a question about Algebra.', sender: 'user' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sure, I can help with that. What is your question?', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">AI Tutor</h1>
      <div className="flex-grow bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
        <div className="flex-grow space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`p-3 rounded-lg max-w-md ${
                  msg.sender === 'ai'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow bg-gray-700 text-white rounded-l-full py-3 px-6 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white font-bold py-3 px-8 rounded-r-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;