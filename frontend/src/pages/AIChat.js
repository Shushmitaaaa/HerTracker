

import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AIChat = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
  // 1. Messages State: Initial message bot ka hai
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: "Hello Shushmita! I'm your FlowState AI assistant. How are you feeling today? Ask me anything about your health or cycle. 🌸" 
    }
  ]);

  // 2. Auto-scroll Logic: Naya message aate hi niche le jayega
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 3. Message Handle Function
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE_URL}/api/auth/chat`, 
        { message: currentInput },
        { 
          headers: { 'x-auth-token': token } 
        }
      );

      // Bot ka reply state mein add karo
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I'm having a little trouble connecting to my brain. Please check your connection and try again! 🩺" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans flex flex-col relative overflow-hidden">
      {/* Background Aesthetic Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full px-8 lg:px-20 py-8 flex items-center gap-8 bg-white/20 backdrop-blur-md border-b border-white relative z-20">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="p-4 bg-white rounded-2xl shadow-sm hover:scale-110 transition-all cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#2D1B15] rounded-xl flex items-center justify-center text-rose-400">
            <Bot size={28} />
          </div>
          <h2 className="text-2xl font-black text-[#2D1B15]">Health Assistant</h2>
        </div>
      </header>

      {/* Chat Messages Main Area */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-[25%] py-12 space-y-6 relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-6 rounded-[30px] shadow-sm border max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-rose-500 text-white rounded-tr-none border-rose-400 shadow-rose-200' 
                : 'bg-white/90 backdrop-blur-xl text-[#2D1B15] rounded-tl-none border-white'
            }`}>
              <p className="text-lg font-medium leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/50 p-4 rounded-2xl animate-pulse flex items-center gap-2">
              <Sparkles size={20} className="text-rose-400" />
              <span className="font-bold text-rose-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input Field Area */}
      <div className="p-8 lg:px-[25%] bg-gradient-to-t from-[#FFF0F3] to-transparent relative z-20">
        <div className="bg-white rounded-[35px] p-3 shadow-2xl flex items-center gap-4 border border-white/50">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about cramps, diet, or mood..." 
            className="flex-1 bg-transparent px-6 py-4 outline-none text-lg font-bold text-[#2D1B15]"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-[#2D1B15] text-white h-14 w-14 rounded-[25px] flex items-center justify-center hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={24} className={isLoading ? "animate-spin" : "text-rose-400"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;