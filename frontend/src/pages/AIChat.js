
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AIChat = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
  
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: "Hello Shushmita! I'm your AI assistant. How are you feeling today? Ask me anything about your health or cycle. 🌸" 
    }
  ]);


  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  
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
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <header className="w-full px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6 md:py-8 flex items-center gap-4 sm:gap-6 md:gap-8 bg-white/20 backdrop-blur-md border-b border-white relative z-20">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:scale-110 transition-all cursor-pointer"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#2D1B15] rounded-lg sm:rounded-xl flex items-center justify-center text-rose-400">
            <Bot size={20} className="sm:w-7 sm:h-7" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2D1B15]">Health Assistant</h2>
        </div>
      </header>

      
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-[20%] xl:px-[25%] py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-6 relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 sm:p-5 md:p-6 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] shadow-sm border max-w-[90%] sm:max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-rose-500 text-white rounded-tr-none border-rose-400 shadow-rose-200' 
                : 'bg-white/90 backdrop-blur-xl text-[#2D1B15] rounded-tl-none border-white'
            }`}>
              <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
       
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl animate-pulse flex items-center gap-2">
              <Sparkles size={16} className="sm:w-5 sm:h-5 text-rose-400" />
              <span className="font-bold text-sm sm:text-base text-rose-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <div className="p-4 sm:p-6 md:p-8 lg:px-[20%] xl:px-[25%] bg-gradient-to-t from-[#FFF0F3] to-transparent relative z-20">
        <div className="bg-white rounded-[25px] sm:rounded-[30px] md:rounded-[35px] p-2 sm:p-2.5 md:p-3 shadow-2xl flex items-center gap-2 sm:gap-3 md:gap-4 border border-white/50">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about cramps, diet, or mood..." 
            className="flex-1 bg-transparent px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 outline-none text-sm sm:text-base md:text-lg font-bold text-[#2D1B15]"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-[#2D1B15] text-white h-12 w-12 sm:h-13 sm:w-13 md:h-14 md:w-14 rounded-[20px] sm:rounded-[22px] md:rounded-[25px] flex items-center justify-center hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={20} className={`sm:w-6 sm:h-6 ${isLoading ? "animate-spin" : "text-rose-400"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;