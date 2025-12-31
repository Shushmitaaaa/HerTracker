import React, { useState } from 'react';
import { Sparkles, Heart, Plus, ChevronRight, Flower , Activity} from 'lucide-react';

const Dashboard = () => {
  const [daysUntil, setDaysUntil] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF5F5] font-sans antialiased text-[#5D4037]">
      
     
      <header className="px-8 pt-12 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[12px] font-bold text-[#E57373] uppercase tracking-[0.2em] mb-1">Good Morning, Beautiful</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#4E342E]">Overview</h1>
        </div>
        <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-pink-100 flex items-center justify-center text-pink-400">
          <Heart fill="currentColor" size={24} />
        </div>
      </header>

      <main className="px-8 mt-4">
        
        <div className="relative bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-white flex flex-col items-center justify-center overflow-hidden mb-8">
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFE0E0] rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-pink-50 text-pink-500 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-pink-100">
              Luteal Phase
            </div>
            
            <div className="flex items-baseline leading-none">
              <span className="text-[110px] font-black tracking-tighter text-[#4E342E]">
                {daysUntil}
              </span>
              <span className="text-2xl font-bold text-pink-300 ml-2">days</span>
            </div>
            
            <p className="mt-4 text-[#8D6E63] font-medium text-lg flex items-center gap-2">
              Next cycle starting soon <Flower size={18} className="text-pink-300" />
            </p>
          </div>
        </div>

        
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group bg-[#FF8A80] rounded-[32px] p-7 text-white shadow-lg shadow-red-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl">Daily Insight</h3>
              <p className="text-red-50 text-sm opacity-90">How are you feeling, dear?</p>
            </div>
          </div>
          <ChevronRight size={24} className="opacity-50 group-hover:translate-x-1 transition-transform" />
        </div>

        
        <div className="grid grid-cols-2 gap-5 mt-8">
          <div className="bg-white p-7 rounded-[32px] border border-pink-50 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400 mb-3">
              <Activity size={24} />
            </div>
            <p className="text-2xl font-black text-[#4E342E]">72</p>
            <p className="text-[#A1887F] text-xs font-bold uppercase">BPM</p>
          </div>
          
          <div className="bg-white p-7 rounded-[32px] border border-pink-50 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-3">
              <Plus size={24} />
            </div>
            <p className="text-2xl font-black text-[#4E342E]">Log</p>
            <p className="text-[#A1887F] text-xs font-bold uppercase">Symptoms</p>
          </div>
        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-pink-900/10 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full rounded-t-[50px] p-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1.5 bg-pink-100 rounded-full mx-auto mb-8"></div>
            <h2 className="text-3xl font-black text-[#4E342E] text-center mb-8 tracking-tight">Daily Check-in</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {['🌸 Happy', '😴 Tired', '🍫 Cravings', '🎈 Bloated'].map((s) => (
                <button key={s} className="py-6 rounded-[24px] bg-[#FFF5F5] hover:bg-pink-100 text-[#5D4037] font-bold text-lg transition-all active:scale-90">
                  {s}
                </button>
              ))}
            </div>
            
            <button 
              className="w-full bg-[#4E342E] text-white py-6 rounded-[24px] font-black text-xl shadow-xl shadow-brown-200"
            >
              Ask my AI Assistant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;