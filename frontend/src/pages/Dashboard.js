import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { Sparkles, Heart, Plus, ChevronRight, Flower, Activity, MessageCircle, Moon, Zap, Target, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CycleCalendar from '../components/CycleCalendar';
import Navbar from '../components/Navbar';
import axios from 'axios';


const Dashboard = () => {

  const navigate = useNavigate();
  const [daysUntil, setDaysUntil] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [cycleData, setCycleData] = useState({ length: 28, lastDate: null });
  const [phase, setPhase] = useState("Loading...");

 
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  // const handleSaveLog = () => {
  //   console.log("Data package for Axios:", {
  //     date: new Date().toISOString(),
  //     symptoms: selectedSymptoms,
  //     phase: "Luteal"
  //   });
  //   setIsModalOpen(false);
  //   setSelectedSymptoms([]); 
  // };

  const handleSaveLog = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/auth/logs', {
      symptoms: selectedSymptoms,
      phase: "Luteal"
    }, {
      headers: { 'x-auth-token': token }
    });

    alert("Vibe Saved! ");
    setIsModalOpen(false);
    setSelectedSymptoms([]);
  } catch (err) {
    alert("Error saving log");
  }
};

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         navigate('/'); 
  //         return;
  //       }

  //       const res = await axios.get('http://localhost:5000/api/auth/user', {
  //         headers: { 'x-auth-token': token }
  //       });
        
  //       setUserName(res.data.name); 
  //     } catch (err) {
  //       console.error("Auth Error:", err);
  //       localStorage.removeItem('token');
  //       navigate('/');
  //     }
  //   };

  //   getUserData();
  // }, [navigate]);

  useEffect(() => {
  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/'); return; }

      // 1. User ka naam lene ke liye
      const res = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { 'x-auth-token': token }
      });
      setUserName(res.data.name); 

      // 2. Logs ka count lene ke liye (Sirf ye 3 lines add karo)
      const logsRes = await axios.get('http://localhost:5000/api/auth/logs', {
        headers: { 'x-auth-token': token }
      });
      setLogs(logsRes.data); // Database se aaye saare logs yahan save ho gaye

    } catch (err) {
      console.error("Auth Error:", err);
      // localStorage.removeItem('token'); // Isse abhi comment rakho testing ke liye
      // navigate('/');
    }
  };
  getUserData();
}, [navigate]);
  

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-500 relative overflow-hidden">
      
    
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-pink-300/30 to-purple-300/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-orange-200/30 to-rose-300/20 rounded-full blur-[120px] pointer-events-none"></div>

    
       <header className="w-full px-8 lg:px-20 pt-12 pb-8 flex justify-between items-center relative z-20">
        <div className="flex-shrink-0">
          <p className="text-[20px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 drop-shadow-sm">Hey {userName || "Beautiful"}</p>
          <h1 className="text-6xl font-black tracking-tight text-[#2D1B15]">Overview</h1>
        </div>

        
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6">
           <Navbar />
        </div>

        <div className="flex gap-4 flex-shrink-0 mt-6">
            <button className="h-16 w-16 bg-white rounded-[24px] shadow-xl border border-white flex items-center justify-center text-rose-500 hover:rotate-12 transition-all cursor-pointer">
                <Heart fill="currentColor" size={32} />
            </button>
        </div>
      </header> 
      

      


      <main className="w-full px-8 lg:px-20 relative z-10">
        
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
      
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
                <p className="text-5xl font-black text-white tracking-tighter">{logs.length}</p>
                <p className="text-rose-300/40 text-[12px] font-black uppercase tracking-[0.3em] mt-2">Logs</p>
             </div>
          </div>
        </div>

       
        <section id="cycle-section" className="scroll-mt-60 mb-20">
        <div className="flex justify-between items-center mb-10 px-4">
            <h3 className="text-4xl font-black text-[#2D1B15] tracking-tight">Cycle History</h3>
            <div className="bg-white px-8 py-3 rounded-full shadow-lg border border-rose-100 flex items-center gap-3">
            <Moon size={20} className="text-rose-400" />
            <span className="text-rose-400 font-black uppercase text-sm tracking-widest">December 2025</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/40 backdrop-blur-3xl rounded-[60px] p-8 lg:p-12 shadow-xl border border-white">
            <div className="lg:col-span-8 bg-white rounded-[45px] p-10 shadow-2xl border border-rose-50/50 flex items-center justify-center">
            <div className="w-full">
                <CycleCalendar />
            </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-10 rounded-[45px] shadow-2xl text-white relative group overflow-hidden">
                <Sparkles size={60} className="absolute right-[-10px] bottom-[-10px] opacity-20" />
                <h4 className="font-black text-2xl mb-4">Hormone Insight</h4>
                <p className="text-rose-50 text-lg leading-relaxed font-medium">
                    Progesterone is peaking. This creates a natural "calm" effect. Perfect for deep reflection.
                </p>
            </div>

            <div className="bg-[#2D1B15] p-10 rounded-[45px] shadow-2xl text-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-rose-400/20 rounded-3xl text-rose-400 shadow-lg"><Activity size={28}/></div>
                    <h4 className="font-black text-2xl">Daily Stat</h4>
                </div>
                <p className="text-rose-100/70 text-lg leading-relaxed">
                    Sleep quality: <b>88%</b>. You reached deep sleep 1.2h faster than last night.
                </p>
            </div>
            </div>
        </div>
        </section>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[#2D1B15]/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[60px] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-4 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer group">
             <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <h2 className="text-5xl font-black text-[#2D1B15] text-center mb-16 tracking-tight">Today's Vibe?</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {['Radiant', 'Charged', 'Cozy', 'Flowy'].map((s) => (
                <button 
                  key={s} 
                  onClick={() => toggleSymptom(s)}
                  className={`py-10 rounded-[40px] text-2xl font-black transition-all active:scale-90 border-4 ${
                    selectedSymptoms.includes(s) 
                      ? 'bg-rose-500 text-white border-rose-200 shadow-2xl' 
                      : 'bg-rose-50/50 text-[#2D1B15] border-transparent hover:bg-rose-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <button 
                  onClick={handleSaveLog} 
                  className="w-full bg-[#2D1B15] text-white py-10 rounded-[45px] font-black text-3xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-6 group hover:bg-black cursor-pointer"
                  >
                  <Sparkles size={40} className="text-rose-400 group-hover:rotate-12 transition-transform" /> 
                  Complete Daily Log
              </button>
              <button 
                  onClick={() => navigate('/chat')} 
                  className="w-full bg-rose-500 text-white py-8 rounded-[45px] font-black text-2xl flex items-center justify-center gap-6 group cursor-pointer"
                  >
                  <MessageCircle size={32} /> 
                  Ask AI Helper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;