import React, { useState } from 'react';

const InputBar = ({ onSend, isTyping }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="sticky bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background to-transparent pt-10">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow bg-white border-none rounded-full py-4 px-8 text-[15px] shadow-lg focus:ring-2 focus:ring-accent-yellow transition-all"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping}
          className="bg-accent-yellow w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95 shrink-0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputBar;
