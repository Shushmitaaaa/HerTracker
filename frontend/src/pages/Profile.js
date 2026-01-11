
import React, { useState, useEffect } from 'react';
import { User, Calendar, Settings, LogOut, ChevronRight, Shield, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';


const Profile = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: ""
  });

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/api/auth/user`, {
          headers: { 'x-auth-token': token }
        });
        
        setUserInfo({
          name: res.data.name,
          cycleLength: res.data.cycleLength || 28,
          periodLength: res.data.periodLength || 5,
          lastPeriodDate: res.data.lastPeriodDate ? res.data.lastPeriodDate.split('T')[0] : ""
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchProfile();
  }, []);

 
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/auth/profile`, {
        cycleLength: userInfo.cycleLength,
        periodLength: userInfo.periodLength, 
        lastPeriodDate: userInfo.lastPeriodDate
      }, {
        headers: { 'x-auth-token': token }
      });
      
      setIsEditing(false);
      setShowSuccessPopup(true); 
    setTimeout(() => setShowSuccessPopup(false), 30000);
    } catch (err) {
      alert("Update Failed. Check Backend Console.");
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-20 relative overflow-x-hidden">
      
     
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="w-full px-8 lg:px-20 pt-12 pb-8 flex justify-between items-center relative z-20">
        <h1 className="text-6xl font-black tracking-tight text-[#2D1B15]">Profile</h1>
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6">
           <Navbar />
        </div>
        
       
        <div className="flex gap-4">
          {isEditing && (
            <button onClick={() => setIsEditing(false)} className="h-16 w-16 bg-white rounded-[24px] shadow-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
              <X size={32} />
            </button>
          )}
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`h-16 w-16 rounded-[24px] shadow-xl flex items-center justify-center transition-all cursor-pointer ${isEditing ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'}`}
          >
            {isEditing ? <Save size={32} /> : <Settings size={32} />}
          </button>
        </div>
      </header>

      <main className="w-full px-8 lg:px-20 relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar / User Card */}
          <div className="lg:col-span-4 bg-white rounded-[60px] p-12 shadow-2xl flex flex-col items-center text-center border border-rose-50 h-fit self-start">
            <div className="w-40 h-40 bg-gradient-to-br from-rose-400 to-rose-600 rounded-[50px] shadow-2xl flex items-center justify-center mb-8 rotate-3">
              <User size={80} color="white" />
            </div>
            <h2 className="text-4xl font-black text-[#2D1B15] mb-2">{userInfo.name}</h2>
            <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-8">Tracker Active</p>
            <button onClick={logout} className="w-full bg-[#2D1B15] text-white py-6 rounded-[30px] font-black text-xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-lg">
              <LogOut size={24} /> Logout
            </button>
          </div>

          
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/50 backdrop-blur-3xl rounded-[60px] p-12 border border-white shadow-xl">
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
                <Calendar className="text-rose-500" size={32} /> Cycle Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-white p-8 rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-xs tracking-widest">Avg Cycle Length</p>
                  <div className="flex items-center justify-between">
                    {isEditing ? (
                      <input 
                        type="number"
                        className="text-4xl font-black text-rose-600 bg-rose-50 w-24 rounded-xl px-2 outline-none"
                        value={userInfo.cycleLength}
                        onChange={(e) => setUserInfo({...userInfo, cycleLength: e.target.value})}
                      />
                    ) : (
                      <span className="text-5xl font-black text-[#2D1B15]">{userInfo.cycleLength}</span>
                    )}
                    <span className="text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>

                
                <div className="bg-white p-8 rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-xs tracking-widest">Period Duration</p>
                  <div className="flex items-center justify-between">
                    {isEditing ? (
                      <input 
                        type="number"
                        className="text-4xl font-black text-rose-600 bg-rose-50 w-24 rounded-xl px-2 outline-none"
                        value={userInfo.periodLength}
                        onChange={(e) => setUserInfo({...userInfo, periodLength: e.target.value})}
                      />
                    ) : (
                      <span className="text-5xl font-black text-[#2D1B15]">{userInfo.periodLength}</span>
                    )}
                    <span className="text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>

                {/* Last Period Date Picker */}
                <div className="md:col-span-2 bg-white p-8 rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-4 uppercase text-xs tracking-widest">When did your last period start?</p>
                  {isEditing ? (
                    <input 
                      type="date"
                      className="w-full text-2xl font-black text-rose-600 bg-rose-50 p-4 rounded-2xl outline-none border-2 border-rose-100"
                      value={userInfo.lastPeriodDate}
                      onChange={(e) => setUserInfo({...userInfo, lastPeriodDate: e.target.value})}
                    />
                  ) : (
                    <span className="text-3xl font-black text-[#2D1B15]">
                      {userInfo.lastPeriodDate ? new Date(userInfo.lastPeriodDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Not Set"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-[#2D1B15] rounded-[50px] p-10 text-white flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-8">
                <div className="p-5 bg-white/10 rounded-3xl"><Shield size={32} className="text-rose-400" /></div>
                <div>
                  <h4 className="text-2xl font-black">Data Encryption</h4>
                  <p className="text-rose-100/50">Stored securely in MongoDB Atlas.</p>
                </div>
              </div>
              <ChevronRight size={40} className="text-white/20 group-hover:translate-x-4 transition-transform" />
            </div>

          </div>
        </div>
      </main>
      {showSuccessPopup && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
    <div className="absolute inset-0 bg-[#2D1B15]/40 backdrop-blur-md"></div>
    
    <div className="relative bg-white rounded-[50px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white max-w-md w-full text-center transform animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-rose-500 rounded-[35px] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-rose-200 rotate-12">
        <Save size={48} color="white" />
      </div>
      
      <h3 className="text-4xl font-black text-[#2D1B15] mb-4 tracking-tight">Sync Complete!</h3>
      <p className="text-[#8D6E63] text-lg font-bold mb-8">
        Your profile data is now safely encrypted and synced. ✨
      </p>
      
      <button 
        onClick={() => setShowSuccessPopup(false)}
        className="w-full bg-[#2D1B15] text-white py-6 rounded-[28px] font-black text-xl hover:bg-black transition-all shadow-xl"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Profile;