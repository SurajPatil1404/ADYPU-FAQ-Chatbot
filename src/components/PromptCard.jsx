import React from 'react';

const PromptCard = ({ title, color, onClick }) => {
  const bgStyles = {
    pink: 'bg-accent-pink',
    green: 'bg-accent-mint',
  };

  return (
    <div className={`${bgStyles[color] || 'bg-white'} p-6 rounded-[32px] flex flex-col justify-between h-[240px] relative overflow-hidden group transition-transform hover:scale-[1.02] cursor-pointer`} onClick={onClick}>
      <div>
        <h3 className="font-syne font-bold text-xl leading-tight mb-2">{title}</h3>
        <p className="text-sm opacity-70">Asked by students</p>
      </div>
      
      {/* Decorative SVG placeholder */}
      <div className="absolute right-4 bottom-16 opacity-30 group-hover:scale-110 transition-transform">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <button className="bg-white text-black font-medium py-2 px-6 rounded-full self-start text-sm hover:bg-opacity-90 transition-all">
        Use this prompt
      </button>
    </div>
  );
};

export default PromptCard;
