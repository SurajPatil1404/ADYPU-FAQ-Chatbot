import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { loadKB, findRelevantQA } from './utils/kbSearch';
import { useGroqChat } from './hooks/useGroqChat';

function App() {
  const [kb, setKb] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { sendMessage, isTyping } = useGroqChat();

  // Load Knowledge Base on mount
  useEffect(() => {
    const initKB = async () => {
      const data = await loadKB();
      setKb(data);
      setIsLoaded(true);
    };
    initKB();
  }, []);

  const activeChat = history.find(c => c.id === activeChatId) || null;

  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
  };

  const handleSend = async (text) => {
    let currentChatId = activeChatId;
    let updatedHistory = [...history];

    // Create new chat if none active
    if (!currentChatId) {
      currentChatId = Date.now();
      const newChat = {
        id: currentChatId,
        title: text.length > 30 ? text.substring(0, 30) + '...' : text,
        messages: []
      };
      updatedHistory = [newChat, ...updatedHistory];
      setHistory(updatedHistory);
      setActiveChatId(currentChatId);
    }

    // Add user message
    const userMsg = { role: 'user', content: text };
    updatedHistory = updatedHistory.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, userMsg] }
        : chat
    );
    setHistory(updatedHistory);

    // Find relevant QA from KB
    const relevantQA = findRelevantQA(text, kb);

    // Placeholder for bot response (for streaming)
    const botMsgPlaceholder = { role: 'bot', content: '' };
    updatedHistory = updatedHistory.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, botMsgPlaceholder] }
        : chat
    );
    setHistory(updatedHistory);

    // Call API with streaming
    await sendMessage(text, relevantQA, (streamedText) => {
      setHistory(prevHistory => prevHistory.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: chat.messages.map((m, i) => 
                i === chat.messages.length - 1 ? { ...m, content: streamedText } : m
              )
            }
          : chat
      ));
    });
  };

  const handleUsePrompt = (text) => {
    handleNewChat();
    // Small delay to ensure state reset before sending
    setTimeout(() => {
      handleSend(text);
    }, 50);
  };

  return (
    <div className="flex h-screen w-full font-dmsans overflow-hidden">
      <Sidebar 
        history={history} 
        onSelectChat={handleSelectChat} 
        onNewChat={handleNewChat}
        onUsePrompt={handleUsePrompt}
      />
      
      <main className="flex-grow flex flex-col grid-dots relative bg-background">
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-8 z-10">
          <button className="p-3 hover:bg-black/5 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex items-center gap-2 font-bold opacity-60">
            <span>CollegeBot v1.0</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <button className="p-3 hover:bg-black/5 rounded-full transition-colors" onClick={handleNewChat}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </header>

        <ChatWindow 
          chat={activeChat} 
          isTyping={isTyping} 
          onStopGenerate={() => {}} // Could implement abort controller
        />

        <InputBar onSend={handleSend} isTyping={isTyping} />
      </main>
    </div>
  );
}

export default App;
