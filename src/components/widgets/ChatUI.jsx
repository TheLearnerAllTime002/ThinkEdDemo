import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';
import Button from '../ui/Button';

// Dummy messages
const dummyMessages = [
  {
    id: 1,
    author: "Alex Johnson",
    content: "Hey everyone! Just joined the calculus study group. Glad to be here!",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    author: "Priya Sharma",
    content: "Welcome, Alex! We're happy to have you. We were just discussing differentiation.",
    timestamp: "10:31 AM"
  },
  {
    id: 3,
    author: "You",
    content: "Hi all! I'm looking forward to learning with you.",
    timestamp: "10:32 AM"
  },
  {
    id: 4,
    author: "Rahul Patel",
    content: "Don't hesitate to ask any questions. We're all here to help each other.",
    timestamp: "10:33 AM"
  }
];

const ChatUI = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // TODO: Integrate Socket.io for real-time messaging
  // useEffect(() => {
  //   const socket = io("http://localhost:3001"); // Replace with your server URL
  //
  //   socket.on("chat message", (msg) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });
  //
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      author: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // In a real app, you would emit this message to the server
    // socket.emit("chat message", message);

    setMessages([...messages, message]);
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[70vh] bg-white/30 dark:bg-slate-800/50 rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-foreground">Calculus Study Group</h2>
          <p className="text-sm text-muted-foreground">4 members online</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="Phone" size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="Video" size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-start gap-3 my-4 ${
                msg.author === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.author !== 'You' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-white font-bold">
                    {msg.author.charAt(0)}
                  </span>
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md ${
                  msg.author === 'You'
                    ? 'bg-gradient-to-r from-[#4A9B8E] to-[#5db3a4] text-white rounded-br-lg'
                    : 'bg-white dark:bg-slate-700 text-foreground rounded-bl-lg'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.author === 'You' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('forum.typeMessage')}
            className="flex-1 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-[#4A9B8E] focus:border-transparent transition-all"
          />
          <Button type="submit" size="icon" className="rounded-full bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white" disabled={!newMessage.trim()}>
            <Icon name="Send" size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;