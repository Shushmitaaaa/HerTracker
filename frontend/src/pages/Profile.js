
import React, { useState, useEffect } from 'react';
import { User, Calendar, Settings, LogOut, ChevronRight, Shield, Save, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#FFF0F3] font-sans antialiased text-[#3C2A21] pb-10 sm:pb-16 md:pb-20 relative overflow-x-hidden">
      
      
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      
      <header className="w-full px-4 sm:px-6 md:px-8 lg:px-20 pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3 md:gap-0">
          <button 
            onClick={() => navigate('/dashboard')}
            className="md:hidden p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:scale-110 transition-all"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6 text-[#2D1B15]" />
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#2D1B15]">Profile</h1>
        </div>
        
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6">
           <Navbar />
        </div>
        
        
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)} 
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-white rounded-[18px] sm:rounded-[20px] md:rounded-[24px] shadow-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
            >
              <X size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          )}
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-[18px] sm:rounded-[20px] md:rounded-[24px] shadow-xl flex items-center justify-center transition-all cursor-pointer ${
              isEditing ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'
            }`}
          >
            {isEditing ? <Save size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" /> : <Settings size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />}
          </button>
        </div>
      </header>

      
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-20 relative z-10 mt-6 sm:mt-8 md:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10">
          
          
          <div className="lg:col-span-4 bg-white rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col items-center text-center border border-rose-50 h-fit self-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-rose-400 to-rose-600 rounded-[35px] sm:rounded-[40px] md:rounded-[50px] shadow-2xl flex items-center justify-center mb-6 sm:mb-7 md:mb-8 rotate-3">
              <User size={56} className="sm:w-16 sm:h-16 md:w-20 md:h-20" color="white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D1B15] mb-2">{userInfo.name}</h2>
            <p className="text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-6 sm:mb-7 md:mb-8">Tracker Active</p>
            <button 
              onClick={logout} 
              className="w-full bg-[#2D1B15] text-white py-4 sm:py-5 md:py-6 rounded-[25px] sm:rounded-[28px] md:rounded-[30px] font-black text-lg sm:text-xl flex items-center justify-center gap-3 sm:gap-4 hover:bg-black transition-all shadow-lg"
            >
              <LogOut size={20} className="sm:w-6 sm:h-6" /> Logout
            </button>
          </div>

          
          <div className="lg:col-span-8 space-y-6 sm:space-y-7 md:space-y-8">
            <div className="bg-white/50 backdrop-blur-3xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-8 sm:p-10 md:p-12 border border-white shadow-xl">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-8 md:mb-10 flex items-center gap-3 sm:gap-4">
                <Calendar className="text-rose-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /> Cycle Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
                
               
                <div className="bg-white p-6 sm:p-7 md:p-8 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-[10px] sm:text-xs tracking-widest">Avg Cycle Length</p>
                  <div className="flex items-center justify-between">
                    {isEditing ? (
                      <input 
                        type="number"
                        className="text-3xl sm:text-4xl font-black text-rose-600 bg-rose-50 w-20 sm:w-24 rounded-xl px-2 outline-none"
                        value={userInfo.cycleLength}
                        onChange={(e) => setUserInfo({...userInfo, cycleLength: e.target.value})}
                      />
                    ) : (
                      <span className="text-4xl sm:text-5xl font-black text-[#2D1B15]">{userInfo.cycleLength}</span>
                    )}
                    <span className="text-lg sm:text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>

                
                <div className="bg-white p-6 sm:p-7 md:p-8 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-2 uppercase text-[10px] sm:text-xs tracking-widest">Period Duration</p>
                  <div className="flex items-center justify-between">
                    {isEditing ? (
                      <input 
                        type="number"
                        className="text-3xl sm:text-4xl font-black text-rose-600 bg-rose-50 w-20 sm:w-24 rounded-xl px-2 outline-none"
                        value={userInfo.periodLength}
                        onChange={(e) => setUserInfo({...userInfo, periodLength: e.target.value})}
                      />
                    ) : (
                      <span className="text-4xl sm:text-5xl font-black text-[#2D1B15]">{userInfo.periodLength}</span>
                    )}
                    <span className="text-lg sm:text-xl font-bold text-rose-400">Days</span>
                  </div>
                </div>

                
                <div className="md:col-span-2 bg-white p-6 sm:p-7 md:p-8 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] shadow-inner border border-rose-50">
                  <p className="text-[#8D6E63] font-bold mb-3 sm:mb-4 uppercase text-[10px] sm:text-xs tracking-widest">When did your last period start?</p>
                  {isEditing ? (
                    <input 
                      type="date"
                      className="w-full text-xl sm:text-2xl font-black text-rose-600 bg-rose-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none border-2 border-rose-100"
                      value={userInfo.lastPeriodDate}
                      onChange={(e) => setUserInfo({...userInfo, lastPeriodDate: e.target.value})}
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-[#2D1B15]">
                      {userInfo.lastPeriodDate ? new Date(userInfo.lastPeriodDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Not Set"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            
            <div className="bg-[#2D1B15] rounded-[35px] sm:rounded-[40px] md:rounded-[50px] p-6 sm:p-8 md:p-10 text-white flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <div className="p-3 sm:p-4 md:p-5 bg-white/10 rounded-2xl sm:rounded-3xl">
                  <Shield size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-black">Data Encryption</h4>
                  <p className="text-rose-100/50 text-sm sm:text-base">Stored securely in MongoDB Atlas.</p>
                </div>
              </div>
              <ChevronRight size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 text-white/20 group-hover:translate-x-4 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#2D1B15]/40 backdrop-blur-md"></div>
          
          <div className="relative bg-white rounded-[35px] sm:rounded-[40px] md:rounded-[50px] p-8 sm:p-10 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white max-w-md w-full text-center transform animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-rose-500 rounded-[28px] sm:rounded-[30px] md:rounded-[35px] flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-8 shadow-lg shadow-rose-200 rotate-12">
              <Save size={40} className="sm:w-11 sm:h-11 md:w-12 md:h-12" color="white" />
            </div>
            
            <h3 className="text-3xl sm:text-3xl md:text-4xl font-black text-[#2D1B15] mb-3 sm:mb-4 tracking-tight">Sync Complete!</h3>
            <p className="text-[#8D6E63] text-base sm:text-lg font-bold mb-6 sm:mb-7 md:mb-8">
              Your profile data is now safely encrypted and synced. ✨
            </p>
            
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-[#2D1B15] text-white py-5 sm:py-5.5 md:py-6 rounded-[24px] sm:rounded-[26px] md:rounded-[28px] font-black text-lg sm:text-xl hover:bg-black transition-all shadow-xl"
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