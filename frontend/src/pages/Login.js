


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, Heart, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
        alert(res.data.msg);
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong!");
    }
  };


const handleForgotSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { 
      email: forgotEmail 
    });
    alert(res.data.msg); 
    setShowForgotModal(false);
  } catch (err) {
    alert("Backend error!");
  }
};

  const handleGoogleLogin = async () => {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
};
  return (
    <div className="min-h-screen bg-[#FFF0F3] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-300/20 rounded-full blur-[120px] animate-pulse"></div>
      
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[60px] shadow-[0_50px_100px_rgba(255,145,175,0.15)] border border-white overflow-hidden relative z-10">
        
        {/* Left Side Branding */}
        <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-rose-400 to-rose-600 text-white relative">
          <Sparkles className="absolute top-10 left-10 opacity-20" size={100} />
          <div className="relative z-10">
            <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
              <Heart fill="white" size={40} />
            </div>
            <h1 className="text-7xl font-black tracking-tighter mb-6 leading-none">Your Cycle, <br/> Your Power.</h1>
            <p className="text-rose-100 text-xl font-medium max-w-md leading-relaxed">Join thousands of women tracking their health with AI-driven insights.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-12 lg:p-16 flex flex-col justify-center bg-white/60">
          <div className="mb-8">
            <h2 className="text-5xl font-black text-[#2D1B15] mb-2 tracking-tight">
              {isLogin ? "Welcome Back" : "Start Journey"}
            </h2>
            <p className="text-[#8D6E63] font-bold">
              {isLogin ? "New here?" : "Already a member?"} 
              <span onClick={() => setIsLogin(!isLogin)} className="text-rose-500 ml-2 cursor-pointer hover:underline underline-offset-4">
                {isLogin ? "Create an account" : "Login instead"}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[25px] py-5 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" required />
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
              </div>
            )}

            <div className="relative">
              <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[25px] py-5 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" required />
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
            </div>

            <div className="relative">
              <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[25px] py-5 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" required />
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
            </div>

            {isLogin && (
              <div className="text-right pr-2">
                <button 
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#8D6E63] font-bold text-sm hover:text-rose-500 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="w-full bg-[#2D1B15] text-white py-6 rounded-[30px] font-black text-xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 group mt-2">
              {isLogin ? "Login Now" : "Sign Up"}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          {/* Google Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[2px] bg-[#8D6E63]/10"></div>
            <span className="px-4 text-[#8D6E63]/40 font-black text-xs uppercase tracking-widest">OR</span>
            <div className="flex-1 h-[2px] bg-[#8D6E63]/10"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-[#8D6E63]/10 text-[#2D1B15] py-5 rounded-[30px] font-black text-lg shadow-sm hover:border-rose-200 transition-all flex items-center justify-center gap-4 group"
          >
            {/* <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="google" className="w-6 h-6 group-hover:scale-110 transition-transform" /> */}
            Continue with Google
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#2D1B15]/40 backdrop-blur-md" onClick={() => setShowForgotModal(false)}></div>
          <div className="relative bg-white rounded-[50px] p-12 shadow-2xl border border-white max-w-md w-full animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowForgotModal(false)} className="absolute right-8 top-8 text-[#8D6E63] hover:text-rose-500">
              <X size={32} />
            </button>
            <h3 className="text-4xl font-black text-[#2D1B15] mb-4 tracking-tight">Reset Key</h3>
            <p className="text-[#8D6E63] font-bold mb-8">Enter your email and we'll send a magic link to reset your power.</p>
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div className="relative">
                <input 
                  type="email" 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Your Email" 
                  className="w-full bg-rose-50 rounded-[25px] py-5 px-6 font-bold text-[#2D1B15] outline-none border-2 border-transparent focus:border-rose-200 transition-all"
                  required 
                />
              </div>
              <button type="submit" className="w-full bg-rose-500 text-white py-6 rounded-[30px] font-black text-xl shadow-lg hover:bg-rose-600 transition-all">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;