import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Sparkles, Heart, Plus, ChevronRight, Flower, Activity, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const [daysUntil, setDaysUntil] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#FFF5F5] font-sans antialiased text-[#4E342E] pb-24">
      
      {/* 1. PREMIUM HEADER */}
      <header className="px-8 pt-12 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-[#E57373] uppercase tracking-[0.2em] mb-1">Status: Optimal</p>
          <h1 className="text-4xl font-extrabold tracking-tight">Today</h1>
        </div>
        <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-pink-100 flex items-center justify-center text-pink-400">
          <Heart fill="currentColor" size={24} />
        </div>
      </header>

      <main className="px-6 mt-4">
        
        {/* 2. THE HERO CARD (Enhanced with Glow) */}
        <div className="relative bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-white flex flex-col items-center justify-center overflow-hidden mb-8 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFE0E0] rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10">
            <div className="bg-pink-50 text-pink-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-pink-100 inline-block">
              Luteal Phase
            </div>
            
            <div className="flex items-baseline justify-center leading-none mb-2">
              <span className="text-[100px] font-black tracking-tighter text-[#4E342E]">
                {daysUntil}
              </span>
              <span className="text-2xl font-bold text-pink-300 ml-2">days</span>
            </div>
            
            <p className="text-[#8D6E63] font-semibold text-sm flex items-center justify-center gap-2">
              until next cycle <Flower size={16} className="text-pink-300" />
            </p>
          </div>
        </div>

        {/* 3. AI INSIGHT STRIP */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group bg-[#FF8A80] rounded-[30px] p-6 text-white shadow-lg shadow-red-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Daily Insight</h3>
              <p className="text-red-50 text-xs opacity-90 font-medium">How are you feeling, dear?</p>
            </div>
          </div>
          <ChevronRight size={20} className="opacity-50 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* 4. ACTIVITY GRID */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 rounded-[35px] border border-pink-50 shadow-sm flex flex-col items-center">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400 mb-3">
              <Activity size={20} />
            </div>
            <p className="text-2xl font-black text-[#4E342E]">72</p>
            <p className="text-[#A1887F] text-[10px] font-bold uppercase tracking-widest">BPM</p>
          </div>
          
          <div className="bg-white p-6 rounded-[35px] border border-pink-50 shadow-sm flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-3">
              <Plus size={20} />
            </div>
            <p className="text-2xl font-black text-[#4E342E]">Log</p>
            <p className="text-[#A1887F] text-[10px] font-bold uppercase tracking-widest">Symptoms</p>
          </div>
        </div>

        {/* 5. CYCLE CALENDAR SECTION */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-xl font-black text-[#4E342E]">Cycle Calendar</h3>
            <span className="text-pink-400 text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-pink-50 shadow-sm">Dec 2025</span>
          </div>
          
          <div className="bg-white rounded-[40px] p-6 shadow-[0_15px_40px_rgba(255,182,193,0.1)] border border-white">
            <Calendar 
              onChange={setDate} 
              value={date} 
              className="apple-calendar-base"
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </section>
      </main>

      {/* 6. SYMPTOM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-pink-900/10 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full rounded-t-[50px] p-10 shadow-2xl animate-in slide-in-from-bottom duration-500 max-w-lg">
            <div className="w-12 h-1.5 bg-pink-100 rounded-full mx-auto mb-8"></div>
            <h2 className="text-3xl font-black text-[#4E342E] text-center mb-8 tracking-tight">Daily Check-in</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {['🌸 Happy', '😴 Tired', '🍫 Cravings', '🎈 Bloated'].map((s) => (
                <button key={s} className="py-5 rounded-[24px] bg-[#FFF5F5] hover:bg-pink-100 text-[#4E342E] font-bold text-lg transition-all active:scale-95 border border-pink-50">
                  {s}
                </button>
              ))}
            </div>
            
            <button className="w-full bg-[#4E342E] text-white py-6 rounded-[28px] font-black text-xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
              <MessageCircle size={24} /> Ask Assistant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;