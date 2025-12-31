// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Sparkles, Heart, Plus, ChevronRight, Flower, Activity, MessageCircle } from 'lucide-react';

// const Dashboard = () => {
//   const [daysUntil, setDaysUntil] = useState(8);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="min-h-screen bg-[#FFF5F5] font-sans antialiased text-[#4E342E] pb-24">
      
//       {/* 1. PREMIUM HEADER */}
//       <header className="px-8 pt-12 pb-6 flex justify-between items-end">
//         <div>
//           <p className="text-[10px] font-black text-[#E57373] uppercase tracking-[0.2em] mb-1">Status: Optimal</p>
//           <h1 className="text-4xl font-extrabold tracking-tight">Today</h1>
//         </div>
//         <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-pink-100 flex items-center justify-center text-pink-400">
//           <Heart fill="currentColor" size={24} />
//         </div>
//       </header>

//       <main className="px-6 mt-4">
        
//         {/* 2. THE HERO CARD (Enhanced with Glow) */}
//         <div className="relative bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-white flex flex-col items-center justify-center overflow-hidden mb-8 text-center">
//           <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFE0E0] rounded-full blur-3xl opacity-60"></div>
          
//           <div className="relative z-10">
//             <div className="bg-pink-50 text-pink-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-pink-100 inline-block">
//               Luteal Phase
//             </div>
            
//             <div className="flex items-baseline justify-center leading-none mb-2">
//               <span className="text-[100px] font-black tracking-tighter text-[#4E342E]">
//                 {daysUntil}
//               </span>
//               <span className="text-2xl font-bold text-pink-300 ml-2">days</span>
//             </div>
            
//             <p className="text-[#8D6E63] font-semibold text-sm flex items-center justify-center gap-2">
//               until next cycle <Flower size={16} className="text-pink-300" />
//             </p>
//           </div>
//         </div>

//         {/* 3. AI INSIGHT STRIP */}
//         <div 
//           onClick={() => setIsModalOpen(true)}
//           className="group bg-[#FF8A80] rounded-[30px] p-6 text-white shadow-lg shadow-red-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all mb-8"
//         >
//           <div className="flex items-center gap-4">
//             <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
//               <Sparkles size={20} />
//             </div>
//             <div>
//               <h3 className="font-bold text-lg leading-tight">Daily Insight</h3>
//               <p className="text-red-50 text-xs opacity-90 font-medium">How are you feeling, dear?</p>
//             </div>
//           </div>
//           <ChevronRight size={20} className="opacity-50 group-hover:translate-x-1 transition-transform" />
//         </div>

//         {/* 4. ACTIVITY GRID */}
//         <div className="grid grid-cols-2 gap-4 mb-10">
//           <div className="bg-white p-6 rounded-[35px] border border-pink-50 shadow-sm flex flex-col items-center">
//             <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400 mb-3">
//               <Activity size={20} />
//             </div>
//             <p className="text-2xl font-black text-[#4E342E]">72</p>
//             <p className="text-[#A1887F] text-[10px] font-bold uppercase tracking-widest">BPM</p>
//           </div>
          
//           <div className="bg-white p-6 rounded-[35px] border border-pink-50 shadow-sm flex flex-col items-center">
//             <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-3">
//               <Plus size={20} />
//             </div>
//             <p className="text-2xl font-black text-[#4E342E]">Log</p>
//             <p className="text-[#A1887F] text-[10px] font-bold uppercase tracking-widest">Symptoms</p>
//           </div>
//         </div>

//         {/* 5. CYCLE CALENDAR SECTION */}
//         {/* 5. CYCLE CALENDAR SECTION */}
//         <section className="mb-10">
//         <div className="flex justify-between items-center mb-6 px-2">
//             <h3 className="text-xl font-black text-[#4E342E]">Cycle Calendar</h3>
//             <span className="text-pink-400 text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-pink-50 shadow-sm">Dec 2025</span>
//         </div>
        
//         <div className="bg-white rounded-[40px] p-8 shadow-apple-glow border border-white flex flex-col md:flex-row gap-8 items-center">
            
//             {/* The Actual Calendar - Now Centered and Styled */}
//             <div className="flex-1 w-full flex justify-center border-r-0 md:border-r border-pink-50 pr-0 md:pr-8">
//             <Calendar 
//                 onChange={setDate} 
//                 value={date} 
//                 className="apple-calendar-base"
//                 next2Label={null}
//                 prev2Label={null}
//             />
//             </div>

//             {/* THE "CUTE" ADDITION: Phase Insight Card */}
//             <div className="flex-1 w-full space-y-4">
//             <div className="bg-[#FFF5F5] rounded-[30px] p-6 border border-pink-100/50">
//                 <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 bg-white rounded-xl text-pink-400 shadow-sm">
//                     <Sparkles size={18} />
//                 </div>
//                 <span className="font-bold text-sm text-[#4E342E]">Phase Insight</span>
//                 </div>
//                 <p className="text-xs text-[#8D6E63] leading-relaxed">
//                 You are in your <b>Luteal Phase</b>. Your body is preparing for rest. Progesterone is rising, which might make you feel more "homey" and creative. 🌸
//                 </p>
//             </div>

//             <div className="bg-orange-50 rounded-[30px] p-6 border border-orange-100/50">
//                 <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Self-Care Tip</p>
//                 <p className="text-xs text-[#4E342E] font-medium">
//                 Ideal time for low-impact movement like Yoga or stretching. 🧘‍♀️
//                 </p>
//             </div>
//             </div>

//         </div>
//         </section>
//       </main>

//       {/* 6. SYMPTOM MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-end justify-center">
//           <div className="absolute inset-0 bg-pink-900/10 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
//           <div className="relative bg-white w-full rounded-t-[50px] p-10 shadow-2xl animate-in slide-in-from-bottom duration-500 max-w-lg">
//             <div className="w-12 h-1.5 bg-pink-100 rounded-full mx-auto mb-8"></div>
//             <h2 className="text-3xl font-black text-[#4E342E] text-center mb-8 tracking-tight">Daily Check-in</h2>
            
//             <div className="grid grid-cols-2 gap-4 mb-10">
//               {['🌸 Happy', '😴 Tired', '🍫 Cravings', '🎈 Bloated'].map((s) => (
//                 <button key={s} className="py-5 rounded-[24px] bg-[#FFF5F5] hover:bg-pink-100 text-[#4E342E] font-bold text-lg transition-all active:scale-95 border border-pink-50">
//                   {s}
//                 </button>
//               ))}
//             </div>
            
//             <button className="w-full bg-[#4E342E] text-white py-6 rounded-[28px] font-black text-xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
//               <MessageCircle size={24} /> Ask Assistant
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Sparkles, Heart, Plus, ChevronRight, Flower, Activity, MessageCircle, Moon, Zap, Target } from 'lucide-react';

const Dashboard = () => {
  const [daysUntil, setDaysUntil] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-12 relative overflow-hidden">
      
      {/* BACKGROUND BLOBS - Scaled up for Desktop */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-pink-300/30 to-purple-300/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-orange-200/30 to-rose-300/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER - Increased padding for wide screens */}
      <header className="w-full px-8 lg:px-20 pt-12 pb-8 flex justify-between items-center relative z-10">
        <div>
          <p className="text-[12px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 drop-shadow-sm">FlowState Architecture v1.0</p>
          <h1 className="text-6xl font-black tracking-tight text-[#2D1B15]">Overview</h1>
        </div>
        <div className="flex gap-4">
            <button className="h-16 w-16 bg-white rounded-[24px] shadow-xl border border-white flex items-center justify-center text-rose-500 hover:rotate-12 transition-all cursor-pointer">
                <Heart fill="currentColor" size={32} />
            </button>
        </div>
      </header>

      <main className="w-full px-8 lg:px-20 relative z-10">
        
        {/* ROW 1: HERO GRID (Stretches full width) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main Counter (7/12 Width) */}
          <div className="lg:col-span-8 relative bg-white/50 backdrop-blur-3xl rounded-[60px] p-12 lg:p-20 shadow-[0_40px_100px_rgba(255,145,175,0.2)] border border-white/80 flex flex-col items-center justify-center overflow-hidden group min-h-[500px]">
            <div className="hormone-wave-container">
                <div className="wave-layer"></div>
                <div className="wave-layer wave-layer-back"></div>
            </div>

            
            <div className="absolute top-10 left-10 bg-rose-500 text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Luteal Phase</div>
            
            <div className="flex items-baseline justify-center leading-none">
              <span className="text-[180px] lg:text-[240px] font-black tracking-tighter text-[#2D1B15] drop-shadow-2xl">{daysUntil}</span>
              <span className="text-5xl font-black text-rose-400 ml-6 uppercase">Days</span>
            </div>
            <p className="text-[#5D4037] font-bold text-2xl mt-4 flex items-center gap-4">
              Rest and Recharge <Flower size={32} className="text-rose-400 animate-bounce" />
            </p>
          </div>

          {/* Side Performance Cards (4/12 Width) */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-8">
            <div className="bg-[#2D1B15] rounded-[50px] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                <Zap className="absolute right-[-20px] top-[-20px] text-rose-500/20 w-40 h-40 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-3xl font-black mb-4">Focus Mode</h3>
                <p className="text-rose-100/60 text-lg leading-relaxed font-medium">Your cognitive sharpess is peaking. Best time for creative work.</p>
            </div>
            <div className="bg-white/80 rounded-[50px] p-10 border border-white shadow-xl flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                    <Target className="text-rose-500" size={32} />
                    <h4 className="text-2xl font-black text-berry">Next Cycle</h4>
                </div>
                <p className="text-[#8D6E63] text-lg font-bold">Estimated: Jan 8th, 2026</p>
            </div>
          </div>
        </div>

        {/* ROW 2: ACTION GRID (3 Equal Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          
          <div onClick={() => setIsModalOpen(true)} className="lg:col-span-2 group bg-gradient-to-r from-[#FF7E7E] to-[#FF9A9E] rounded-[50px] p-12 text-white shadow-2xl flex items-center justify-between cursor-pointer hover:translate-y-[-8px] transition-all">
            <div className="flex items-center gap-10">
              <div className="bg-white/20 backdrop-blur-xl p-6 rounded-[35px] shadow-inner"><Sparkles size={40} /></div>
              <div>
                <h3 className="font-black text-4xl mb-2 tracking-tight text-white">Vibe Check</h3>
                <p className="text-rose-50 text-xl font-medium opacity-90">Log your physical & mental states</p>
              </div>
            </div>
            <ChevronRight size={48} className="opacity-50 group-hover:translate-x-4 transition-transform" />
          </div>

          <div className="bg-[#2D1B15] p-12 rounded-[50px] shadow-2xl border-b-[10px] border-rose-500 flex justify-around items-center">
             <div className="text-center group cursor-default">
                <Activity size={40} className="text-rose-400 mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <p className="text-5xl font-black text-white tracking-tighter">72</p>
                <p className="text-rose-300/40 text-[12px] font-black uppercase tracking-[0.3em] mt-2">BPM</p>
             </div>
             <div className="w-[2px] h-20 bg-white/10"></div>
             <div className="text-center group cursor-default">
                <Plus size={40} className="text-rose-400 mb-4 mx-auto group-hover:scale-125 transition-transform" />
                <p className="text-5xl font-black text-white tracking-tighter">12</p>
                <p className="text-rose-300/40 text-[12px] font-black uppercase tracking-[0.3em] mt-2">Logs</p>
             </div>
          </div>
        </div>

        {/* ROW 3: CALENDAR & ANALYSIS (Balanced 8/4 Split) */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-10 px-4">
            <h3 className="text-4xl font-black text-[#2D1B15] tracking-tight">Cycle History</h3>
            <div className="bg-white px-8 py-3 rounded-full shadow-lg border border-rose-100 flex items-center gap-3">
              <Moon size={20} className="text-rose-400" />
              <span className="text-rose-400 font-black uppercase text-sm tracking-widest">December 2025</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/40 backdrop-blur-3xl rounded-[60px] p-12 lg:p-16 shadow-apple-glow border border-white">
            
            {/* The Actual Calendar Card (8/12 Width) */}
            <div className="lg:col-span-8 bg-white rounded-[45px] p-12 shadow-2xl border border-rose-50/50">
              <div className="calendar-container w-full overflow-hidden">
                <Calendar 
                    onChange={setDate} 
                    value={date} 
                    className="apple-calendar-fullwidth"
                    next2Label={null}
                    prev2Label={null}
                />
              </div>
            </div>

            {/* Insight Column (4/12 Width) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-10 rounded-[45px] shadow-2xl text-white relative group overflow-hidden">
                  <Sparkles size={60} className="absolute right-[-10px] bottom-[-10px] opacity-20 group-hover:scale-150 transition-transform duration-1000" />
                  <h4 className="font-black text-2xl mb-4">Hormone Insight</h4>
                  <p className="text-rose-50 text-lg leading-relaxed font-medium">
                    Progesterone is peaking. This creates a natural "calm" effect. Perfect for deep reflection.
                  </p>
               </div>

               <div className="bg-[#2D1B15] p-10 rounded-[45px] shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-rose-400 rounded-3xl text-[#2D1B15] shadow-lg"><Activity size={28}/></div>
                    <h4 className="font-black text-2xl text-white">Daily Stat</h4>
                  </div>
                  <p className="text-rose-100/70 text-lg leading-relaxed">
                    Sleep quality: <b>88%</b>. You reached deep sleep 1.2h faster than last night.
                  </p>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* FULL SCREEN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[#2D1B15]/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[60px] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-300">
            <h2 className="text-5xl font-black text-[#2D1B15] text-center mb-16 tracking-tight">Today's Vibe?</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {['🌸 Radiant', '🔋 Charged', '🧸 Cozy', '🌊 Flowy'].map((s) => (
                <button key={s} className="py-10 rounded-[40px] bg-rose-50/50 hover:bg-rose-500 hover:text-white text-[#2D1B15] font-black text-2xl transition-all active:scale-90 border-2 border-transparent hover:shadow-2xl">
                  {s}
                </button>
              ))}
            </div>
            <button className="w-full bg-[#2D1B15] text-white py-10 rounded-[45px] font-black text-3xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-6 group hover:bg-black">
              <MessageCircle size={40} className="text-rose-400 group-hover:rotate-12 transition-transform" /> 
              Open AI Health Assistant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;