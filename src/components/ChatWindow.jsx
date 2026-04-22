import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ chat, isTyping, onStopGenerate }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat?.messages, isTyping]);

  if (!chat) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-accent-yellow rounded-full flex items-center justify-center mb-8 shadow-xl">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h1 className="font-manrope font-extrabold text-6xl mb-6 leading-tight">
          Ask anything <br /> about college
        </h1>
        <p className="text-xl opacity-60 max-w-md">
          I'm here to help you with campus life, academics, and more at ADYPU.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="p-8 pb-4">
        <h1 className="font-manrope font-extrabold text-4xl mb-2">{chat.title}</h1>
      </div>

      {/* Message Thread */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-8 py-4 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto">
          {chat.messages.map((msg, idx) => (
            <MessageBubble 
              key={idx} 
              role={msg.role} 
              content={msg.content} 
              label={msg.role === 'bot' ? 'CollegeBot' : 'Me'} 
            />
          ))}
          
          {isTyping && (
            <div className="flex justify-center mb-10">
              <button 
                onClick={onStopGenerate}
                className="bg-accent-yellow text-black font-bold py-3 px-8 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-black rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-4 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                Stop generate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
