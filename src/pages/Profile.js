import React, { useState } from 'react';
import { User, Calendar, clock, Settings, LogOut, ChevronRight, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile = () => {
 
  const [userInfo, setUserInfo] = useState({
    name: "Beautiful User",
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: "2025-12-25"
  });

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-20 relative overflow-x-hidden">
      
     
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      
      <header className="w-full px-8 lg:px-20 pt-12 pb-8 flex justify-between items-center relative z-20">
        <h1 className="text-6xl font-black tracking-tight text-[#2D1B15]">Profile</h1>
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6">
           <Navbar />
        </div>
        <button className="h-16 w-16 bg-white rounded-[24px] shadow-xl flex items-center justify-center text-rose-500 hover:scale-110 transition-all cursor-pointer">
            <Settings size={32} />
        </button>
      </header>

      <main className="w-full px-8 lg:px-20 relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
        
          <div className="lg:col-span-4 bg-white rounded-[60px] p-12 shadow-2xl flex flex-col items-center text-center">
            <div className="w-40 h-40 bg-gradient-to-br from-rose-400 to-rose-600 rounded-[50px] shadow-2xl flex items-center justify-center mb-8 rotate-3">
              <User size={80} color="white" />
            </div>
            <h2 className="text-4xl font-black text-[#2D1B15] mb-2">{userInfo.name}</h2>
            <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-8">Premium Member</p>
            <button className="w-full bg-[#2D1B15] text-white py-6 rounded-[30px] font-black text-xl flex items-center justify-center gap-4 hover:bg-black transition-all">
              <LogOut size={24} /> Logout
            </button>
          </div>

          
          <div className="lg:col-span-8 space-y-8">
            
          
            <div className="bg-white/50 backdrop-blur-3xl rounded-[60px] p-12 border border-white/80 shadow-xl">
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
                <Calendar className="text-rose-500" size={32} /> Cycle Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-xs tracking-widest">Avg Cycle Length</p>
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-black text-[#2D1B15]">{userInfo.cycleLength}</span>
                    <span className="text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-xs tracking-widest">Period Duration</p>
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-black text-[#2D1B15]">{userInfo.periodLength}</span>
                    <span className="text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>
              </div>
            </div>

           {/* Privacy & Security */}
            <div className="bg-[#2D1B15] rounded-[50px] p-10 text-white flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-8">
                <div className="p-5 bg-white/10 rounded-3xl"><Shield size={32} className="text-rose-400" /></div>
                <div>
                  <h4 className="text-2xl font-black">Data Encryption</h4>
                  <p className="text-rose-100/50">Your health data is E2E encrypted.</p>
                </div>
              </div>
              <ChevronRight size={40} className="text-white/20 group-hover:translate-x-4 transition-transform" />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;