import React from 'react';

const MessageBubble = ({ role, content, label }) => {
  const isBot = role === 'bot';

  return (
    <div className={`flex flex-col mb-6 ${isBot ? 'items-start' : 'items-end'}`}>
      <div className={`flex items-center mb-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isBot ? 'bg-black text-white' : 'bg-gray-300'}`}>
          {isBot ? '*' : 'U'}
        </div>
        <span className={`text-xs font-medium mx-2 opacity-50 uppercase tracking-wider`}>
          {label}
        </span>
      </div>
      
      <div className={`max-w-[80%] p-4 rounded-[20px] shadow-sm ${
        isBot 
          ? 'bg-accent-pinkBubble text-black rounded-tl-none' 
          : 'bg-dark text-white rounded-tr-none'
      }`}>
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
