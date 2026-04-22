import React from 'react';
import PromptCard from './PromptCard';

const Sidebar = ({ history, onSelectChat, onNewChat, onUsePrompt }) => {
  return (
    <aside className="w-[320px] bg-sidebar h-screen flex flex-col p-6 text-white shrink-0">
      {/* App Logo */}
      <div className="flex items-center justify-between mb-8 cursor-pointer">
        <h1 className="font-syne font-extrabold text-xl">CollegeBot v1.0</h1>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* New Chat Button */}
      <button 
        onClick={onNewChat}
        className="bg-accent-yellow text-black font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 mb-10 hover:opacity-90 transition-all active:scale-95"
      >
        New Chat
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {/* Chat History */}
      <div className="flex-grow overflow-y-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-50">Chat history</h2>
          <button className="text-xs opacity-50 hover:opacity-100">See All</button>
        </div>
        
        <div className="flex flex-col gap-2">
          {history.length === 0 ? (
            <p className="text-sm opacity-30 italic px-2">No history yet</p>
          ) : (
            history.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="text-left py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm truncate"
              >
                {chat.title}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Popular Questions */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-50">Popular Questions</h2>
          <button className="text-xs opacity-50 hover:opacity-100">See All</button>
        </div>
        
        <div className="flex flex-col gap-4">
          <PromptCard 
            title="Explain the grading system" 
            color="pink" 
            onClick={() => onUsePrompt("Explain the grading system")}
          />
          <PromptCard 
            title="Best campus study spots" 
            color="green" 
            onClick={() => onUsePrompt("Best campus study spots")}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
