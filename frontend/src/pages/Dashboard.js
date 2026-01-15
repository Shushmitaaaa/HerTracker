
import React, { useState } from 'react';
import { Sparkles, Heart, Plus, ChevronRight, Flower, Activity, MessageCircle, Zap, Target, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import CycleSection from '../components/CycleSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const [daysUntil, setDaysUntil] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [logs, setLogs] = useState([]);
  const [phase, setPhase] = useState("Loading...");
  const [userData, setUserData] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showVibePopup, setShowVibePopup] = useState(false);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  // const handleSaveLog = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.post(`${API_BASE_URL}/api/auth/logs`, {
  //       symptoms: selectedSymptoms,
  //       phase: "Luteal"
  //     }, {
  //       headers: { 'x-auth-token': token }
  //     });

  //     alert("Vibe Saved! ");
  //     setIsModalOpen(false);
  //     setSelectedSymptoms([]);
  //   } catch (err) {
  //     alert("Error saving log");
  //   }
  // };

  const handleSaveLog = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE_URL}/api/auth/logs`, {
      symptoms: selectedSymptoms,
      phase: "Luteal"
    }, {
      headers: { 'x-auth-token': token }
    });

    setIsModalOpen(false);
    setShowVibePopup(true);
    setTimeout(() => setShowVibePopup(false), 10000);
    setSelectedSymptoms([]);
  } catch (err) {
    alert("Error saving log");
  }
};

  useEffect(() => {
    const fetchDashboardData = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token');
      
      if (tokenFromUrl) {
        localStorage.setItem('token', tokenFromUrl);
        window.history.replaceState({}, document.title, "/dashboard");
      }
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const [userRes, logsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/auth/user`, { 
            headers: { 'x-auth-token': token } 
          }),
          axios.get(`${API_BASE_URL}/api/auth/logs`, { 
            headers: { 'x-auth-token': token } 
          })
        ]);

        setUserName(userRes.data.name);
        setLogs(logsRes.data);
        setUserData(userRes.data);

        if (userRes.data.lastPeriodDate) {
          const lastDate = new Date(userRes.data.lastPeriodDate);
          const cycle = userRes.data.cycleLength || 28;
          const today = new Date();
          const nextPeriod = new Date(lastDate);
          nextPeriod.setDate(lastDate.getDate() + cycle);
          
          const diffTime = nextPeriod - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysUntil(diffDays > 0 ? diffDays : "0");

          if (diffDays <= 0) {
              setPhase("Menstrual Phase");
          } else if (diffDays <= 7) {
              setPhase("Luteal Phase");
          } else if (diffDays > 7 && diffDays <= 13) {
              setPhase("Ovulatory Phase");
          } else if (diffDays > 13 && diffDays <= 21) {
              setPhase("Follicular Phase");
          } else {
              setPhase("Menstrual Phase");
          }
        }

        if (window.location.hash === '#cycle-section') {
          setTimeout(() => {
            const element = document.getElementById('cycle-section');
            if (element) {
              const offset = 150; 
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 500); 
        }

      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };

    fetchDashboardData();
  }, []);

  const phaseDetails = {
    "Menstrual Phase": {
      title: "Rest Mode",
      desc: "You are in your menstrual phase. Your energy is at its lowest. Focus on intuitive movement, light stretching, and deep rest."
    },
    "Follicular Phase": {
      title: "Creative Spark",
      desc: "You are in your follicular phase. Estrogen is rising! You're more open to new ideas. Perfect time for brainstorming and planning."
    },
    "Ovulatory Phase": {
      title: "Peak Power",
      desc: "You are in your ovulatory phase. High energy and confidence. Great for public speaking, social events, and high-intensity workouts."
    },
    "Luteal Phase": {
      title: "Focus Mode",
      desc: "You are in your luteal phase. Your cognitive sharpness is peaking. Best time for detail-oriented tasks and creative work."
    },
    "Loading...": {
      title: "Syncing...",
      desc: "Calculating your current cycle insights to provide personalized tips."
    }
  };

  const currentPhaseInfo = phaseDetails[phase] || phaseDetails["Luteal Phase"];

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-5 md:pb-5 relative overflow-hidden">
      
      
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-pink-300/30 to-purple-300/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-orange-200/30 to-rose-300/20 rounded-full blur-[120px] pointer-events-none"></div>

      
      <header className="w-full px-4 sm:px-6 md:px-8 lg:px-20 pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 relative z-20">
        <div className="md:hidden flex flex-col items-start gap-4">
          <div className="flex-shrink-0">
            {/* <p className="text-sm font-black text-rose-500 uppercase tracking-[0.2em] mb-1 drop-shadow-sm">
              Hey {userName || "Beautiful"}
            </p> */}
            <h1 className="text-3xl sm:text-4xl lm:-5 font-black tracking-tight text-[#2D1B15]">Hey {userName || "Beautiful"}</h1>
          </div>
          <div className="w-full flex justify-center">
            <Navbar />
          </div>
        </div>

        
        <div className="hidden md:flex justify-between items-center">
          <div className="flex-shrink-0">
            <p className="text-base md:text-[20px] font-black text-rose-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-1 sm:mb-2 drop-shadow-sm">
              Hey {userName || "Beautiful"}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-[#2D1B15]">HerTracker</h1>
          </div>

          
          <div className="absolute left-1/2 -translate-x-1/2 top-16">
            <Navbar />
          </div>

          <div className="flex gap-4 flex-shrink-0 mt-6">
            <button className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-[20px] md:rounded-[24px] shadow-xl border border-white flex items-center justify-center text-rose-500 hover:rotate-12 transition-all cursor-pointer">
              <Heart fill="currentColor" className="w-7 h-7 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-20 pb-6 md:pb-0 relative z-10">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-10">
          
          
          <div className="lg:col-span-8 relative bg-white/50 backdrop-blur-3xl rounded-[40px] md:rounded-[60px] p-8 sm:p-12 lg:p-20 shadow-[0_20px_60px_rgba(255,145,175,0.2)] border border-white/80 flex flex-col items-center justify-center overflow-hidden group min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
            <div className="hormone-wave-container">
                <div className="wave-layer"></div>
                <div className="wave-layer wave-layer-back"></div>
            </div>

            <div className="absolute top-6 sm:top-8 md:top-10 left-6 sm:left-8 md:left-10 bg-rose-500 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg">
              {phase}
            </div>
            
            <div className="flex items-baseline justify-center leading-none">
              <span className="text-[100px] sm:text-[140px] md:text-[180px] lg:text-[240px] font-black tracking-tighter text-[#2D1B15] drop-shadow-2xl">
                {daysUntil}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-rose-400 ml-3 sm:ml-4 md:ml-6 uppercase">
                Days
              </span>
            </div>
            <p className="text-[#5D4037] font-bold text-base sm:text-lg md:text-xl lg:text-2xl mt-2 md:mt-4 flex items-center gap-2 md:gap-4">
              Rest and Recharge 
              <Flower className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-rose-400 animate-bounce" />
            </p>
          </div>

          
          <div className="lg:col-span-4 grid grid-rows-1 md:grid-rows-2 gap-4 md:gap-8">
            
            
            <div className="bg-[#2D1B15] rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                <Zap className="absolute right-[-20px] top-[-20px] text-rose-500/20 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 md:mb-4 relative z-10">
                  {currentPhaseInfo.title}
                </h3>
                <p className="text-rose-100/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium relative z-10">
                  {currentPhaseInfo.desc}
                </p>
            </div>

            
            <div className="bg-white/80 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10 border border-white shadow-xl flex flex-col justify-center relative">
              <div className="absolute right-[-10px] top-[-10px] bg-rose-100/30 w-32 h-32 rounded-full blur-3xl group-hover:bg-rose-200/40 transition-all duration-700"></div>
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                    <Target className="text-rose-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D1B15]">Next Cycle</h4>
                </div>
                <p className="text-[#8D6E63] text-sm sm:text-base md:text-lg font-bold relative z-10">
                    Estimated: {
                      daysUntil !== null && daysUntil !== undefined ? (
                        new Date(new Date().setDate(new Date().getDate() + Number(daysUntil)))
                        .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      ) : "Set your date"
                    }
                </p>
            </div>
          </div>
        </div> 

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-10">
          
          
          <div onClick={() => setIsModalOpen(true)} className="lg:col-span-2 group bg-gradient-to-r from-[#FF7E7E] to-[#FF9A9E] rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10 lg:p-12 text-white shadow-2xl flex items-center justify-between cursor-pointer hover:translate-y-[-8px] transition-all">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div className="bg-white/20 backdrop-blur-xl p-4 sm:p-5 md:p-6 rounded-[25px] sm:rounded-[30px] md:rounded-[35px] shadow-inner flex-shrink-0">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="font-black text-2xl sm:text-3xl md:text-4xl mb-1 md:mb-2 tracking-tight text-white">
                  Vibe Check
                </h3>
                <p className="text-rose-50 text-sm sm:text-base md:text-lg lg:text-xl font-medium opacity-90">
                  Log your physical & mental states
                </p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-50 group-hover:translate-x-4 transition-transform hidden sm:block" />
          </div>

          
          <div className="bg-[#2D1B15] p-6 sm:p-8 md:p-10 lg:p-12 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] shadow-2xl border-b-[6px] sm:border-b-[8px] md:border-b-[10px] border-rose-500 flex justify-around items-center">
             <div className="text-center group cursor-default">
                <Activity className="text-rose-400 mb-2 sm:mb-3 md:mb-4 mx-auto group-hover:scale-125 transition-transform w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">72</p>
                <p className="text-rose-300/40 text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] mt-1 sm:mt-2">BPM</p>
             </div>
             <div className="w-[2px] h-12 sm:h-16 md:h-20 bg-white/10"></div>
             <div className="text-center group cursor-default">
                <Plus className="text-rose-400 mb-2 sm:mb-3 md:mb-4 mx-auto group-hover:scale-125 transition-transform w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">{logs.length}</p>
                <p className="text-rose-300/40 text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] mt-1 sm:mt-2">Logs</p>
             </div>
          </div>
        </div>

        <CycleSection userData={userData} />
        
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="absolute inset-0 bg-[#2D1B15]/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-8 sm:p-12 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 p-3 sm:p-4 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer group">
             <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2D1B15] text-center mb-8 sm:mb-12 md:mb-16 tracking-tight">
              Today's Vibe?
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
              {['Radiant', 'Charged', 'Cozy', 'Flowy'].map((s) => (
                <button 
                  key={s} 
                  onClick={() => toggleSymptom(s)}
                  className={`py-6 sm:py-8 md:py-10 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] text-lg sm:text-xl md:text-2xl font-black transition-all active:scale-90 border-4 ${
                    selectedSymptoms.includes(s) 
                      ? 'bg-rose-500 text-white border-rose-200 shadow-2xl' 
                      : 'bg-rose-50/50 text-[#2D1B15] border-transparent hover:bg-rose-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <button 
                  onClick={handleSaveLog} 
                  className="w-full bg-[#2D1B15] text-white py-6 sm:py-8 md:py-10 rounded-[35px] sm:rounded-[40px] md:rounded-[45px] font-black text-xl sm:text-2xl md:text-3xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 sm:gap-5 md:gap-6 group hover:bg-black cursor-pointer"
                  >
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-rose-400 group-hover:rotate-12 transition-transform" /> 
                  Complete Daily Log
              </button>
              <button 
                  onClick={() => navigate('/chat')} 
                  className="w-full bg-rose-500 text-white py-5 sm:py-6 md:py-8 rounded-[35px] sm:rounded-[40px] md:rounded-[45px] font-black text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-4 sm:gap-5 md:gap-6 group cursor-pointer"
                  >
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /> 
                  Ask AI Helper
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showVibePopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#2D1B15]/40 backdrop-blur-md" onClick={() => setShowVibePopup(false)}></div>
          
          <div className="relative bg-white rounded-[40px] sm:rounded-[50px] p-10 sm:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white max-w-sm w-full text-center transform animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-rose-500 to-pink-500 rounded-[30px] sm:rounded-[35px] flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg shadow-rose-200 rotate-12">
              <Sparkles size={40} className="sm:w-12 sm:h-12" color="white" />
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black text-[#2D1B15] mb-3 sm:mb-4 tracking-tight">Vibe Saved!</h3>
            <p className="text-[#8D6E63] text-base sm:text-lg font-bold mb-6 sm:mb-8">
              Your daily vibe has been logged successfully ✨
            </p>
            
            <button 
              onClick={() => setShowVibePopup(false)}
              className="w-full bg-rose-500 text-white py-5 sm:py-6 rounded-[25px] sm:rounded-[28px] font-black text-lg sm:text-xl hover:bg-rose-600 transition-all shadow-xl"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;