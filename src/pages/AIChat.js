import React, { useState } from 'react';
import { Send, ArrowLeft, Sparkles, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIChat = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans flex flex-col relative overflow-hidden">
      {/* Background Blobs for that Apple look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full px-8 lg:px-20 py-8 flex items-center gap-8 bg-white/20 backdrop-blur-md border-b border-white relative z-10">
        <button onClick={() => navigate('/')} className="p-4 bg-white rounded-2xl shadow-sm hover:scale-110 transition-all cursor-pointer">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#2D1B15] rounded-xl flex items-center justify-center text-rose-400">
            <Bot size={28} />
          </div>
          <h2 className="text-2xl font-black text-[#2D1B15]">Health Assistant</h2>
        </div>
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-[25%] py-12 space-y-8 relative z-10">
        <div className="flex items-start gap-4">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] rounded-tl-none shadow-sm border border-white max-w-[80%]">
            <p className="text-lg font-medium">Hello! I'm your FlowState AI. Based on your Luteal phase (Day 8), you might be feeling a bit tired. How can I help today? 🌸</p>
          </div>
        </div>
      </main>

      {/* Input - Sticky at bottom */}
      <div className="p-8 lg:px-[25%] relative z-10">
        <div className="bg-white rounded-[35px] p-3 shadow-2xl flex items-center gap-4 border border-white/50">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your cramps, mood, or diet..." 
            className="flex-1 bg-transparent px-6 py-4 outline-none text-lg font-bold"
          />
          <button className="bg-[#2D1B15] text-white h-14 w-14 rounded-[25px] flex items-center justify-center hover:scale-105 transition-all">
            <Send size={24} className="text-rose-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;