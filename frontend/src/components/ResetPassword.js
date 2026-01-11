import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
      alert(res.data.msg);
      navigate('/'); // Login pe wapas bhej do
    } catch (err) {
      alert(err.response?.data?.msg || "Link expired!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] flex items-center justify-center p-6 font-sans overflow-hidden relative">
       <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-300/20 rounded-full blur-[120px]"></div>
       
       <div className="w-full max-w-[500px] bg-white/40 backdrop-blur-3xl rounded-[60px] p-12 shadow-2xl border border-white relative z-10 text-center">
          <Sparkles className="mx-auto text-rose-500 mb-6" size={50} />
          <h2 className="text-4xl font-black text-[#2D1B15] mb-4">New Power</h2>
          <p className="text-[#8D6E63] font-bold mb-8">Set a new password and regain control of your account.</p>
          
          <form onSubmit={handleReset} className="space-y-6">
            <div className="relative">
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password" 
                className="w-full bg-white rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] outline-none border-2 border-transparent focus:border-rose-200 transition-all shadow-sm"
                required 
              />
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
            </div>

            <button type="submit" className="w-full bg-[#2D1B15] text-white py-6 rounded-[35px] font-black text-xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 group">
              Update Password
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
       </div>
    </div>
  );
};

export default ResetPassword;