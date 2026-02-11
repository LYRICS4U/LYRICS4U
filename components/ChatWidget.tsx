
import React, { useState, useEffect, useRef } from 'react';
import { firebaseService } from '../services/firebase';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const unsubscribe = firebaseService.listenToChat(setMessages);
      return () => unsubscribe();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const senderName = userName || 'Guest';
    await firebaseService.sendMessage({
      sender: 'user',
      text: inputValue,
      userName: senderName
    });
    
    setInputValue('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#ffd700] rounded-full shadow-2xl flex items-center justify-center text-purple-950 text-2xl z-[60] gold-glow transition-transform hover:scale-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] glass rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#ffd700] p-4 flex justify-between items-center text-purple-950 font-bold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Chat with Muzamil</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl">&times;</button>
          </div>
          
          <div className="p-3 text-xs text-white/50 text-center italic">
            Cloud-synced consultation room
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-white/40 text-sm mt-20 px-6">
                Hi! Ask us anything about lyrics, pricing, or custom requests.
              </div>
            )}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                    ? 'bg-purple-600/50 text-white rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/30 mt-1">
                  {msg.sender === 'user' ? (msg.userName || 'You') : 'Manager Muzamil'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 flex flex-col gap-2">
            {!userName && (
              <input 
                type="text" 
                placeholder="Your Name (optional)" 
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none focus:border-[#ffd700]/50 transition text-white"
                onBlur={(e) => setUserName(e.target.value)}
              />
            )}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#ffd700]/50 transition text-white"
              />
              <button 
                onClick={handleSend}
                className="bg-[#ffd700] p-2 rounded-xl text-purple-950 font-bold hover:scale-105 active:scale-95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
