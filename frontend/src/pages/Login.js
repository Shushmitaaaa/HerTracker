// import React, { useState } from 'react';
// import { Mail, Lock, ArrowRight, Sparkles, Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Later: Axios call to Backend goes here
//     console.log("Authenticating...");
//     navigate('/'); // Take them to dashboard for now
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF0F3] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
     
//       <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-300/20 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/20 rounded-full blur-[100px]"></div>

//       <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[60px] shadow-[0_50px_100px_rgba(255,145,175,0.15)] border border-white overflow-hidden relative z-10">
        
        
//         <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-rose-400 to-rose-600 text-white relative">
//           <Sparkles className="absolute top-10 left-10 opacity-20" size={100} />
//           <div className="relative z-10">
//             <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
//               <Heart fill="white" size={40} />
//             </div>
//             <h1 className="text-7xl font-black tracking-tighter mb-6 leading-none">Your Cycle, <br/> Your Power.</h1>
//             <p className="text-rose-100 text-xl font-medium max-w-md leading-relaxed">
//               Join thousands of women tracking their health with AI-driven insights and a touch of magic.
//             </p>
//           </div>
//           <div className="absolute bottom-10 left-20 right-20 h-1 bg-white/20 rounded-full overflow-hidden">
//             <div className="h-full bg-white w-1/3"></div>
//           </div>
//         </div>

        
//         <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/60">
//           <div className="mb-12">
//             <h2 className="text-5xl font-black text-[#2D1B15] mb-4 tracking-tight">
//               {isLogin ? "Welcome Back" : "Start Journey"}
//             </h2>
//             <p className="text-[#8D6E63] font-bold">
//               {isLogin ? "New here?" : "Already a member?"} 
//               <span 
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-rose-500 ml-2 cursor-pointer hover:underline"
//               >
//                 {isLogin ? "Create an account" : "Login instead"}
//               </span>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isLogin && (
//               <div className="relative">
//                 <input type="text" placeholder="Full Name" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" />
//                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
//               </div>
//             )}

//             <div className="relative">
//               <input type="email" placeholder="Email Address" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" />
//               <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
//             </div>

//             <div className="relative">
//               <input type="password" placeholder="Password" className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" />
//               <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
//             </div>

//             <button type="submit" className="w-full bg-[#2D1B15] text-white py-7 rounded-[35px] font-black text-2xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group">
//               {isLogin ? "Login Now" : "Sign Up"}
//               <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
//             </button>
//           </form>

//           <div className="mt-12 text-center">
//             <p className="text-[#8D6E63]/40 text-sm font-black uppercase tracking-widest">Secure E2E Encryption</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const User = ({ className, size }) => (
//   <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
// );

// export default Login;


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Axios import karo

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // 2. Form state manage karo
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  // 3. Input change handler
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // LOGIN LOGIC
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        console.log("Login Success, Token:", res.data.token);
        localStorage.setItem('token', res.data.token); // token receiuved from the server will be stored in browser
        navigate('/dashboard'); // Dashboard bhejo
      } else {
        // SIGNUP LOGIC
        const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        alert(res.data.msg);
        setIsLogin(true); // Signup ke baad login page par switch karo
      }
    } catch (err) {
      console.error(err.response?.data?.msg || "Error occurred");
      alert(err.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-300/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[60px] shadow-[0_50px_100px_rgba(255,145,175,0.15)] border border-white overflow-hidden relative z-10">
        
        <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-rose-400 to-rose-600 text-white relative">
          <Sparkles className="absolute top-10 left-10 opacity-20" size={100} />
          <div className="relative z-10">
            <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
              <Heart fill="white" size={40} />
            </div>
            <h1 className="text-7xl font-black tracking-tighter mb-6 leading-none">Your Cycle, <br/> Your Power.</h1>
            <p className="text-rose-100 text-xl font-medium max-w-md leading-relaxed">
              Join thousands of women tracking their health with AI-driven insights and a touch of magic.
            </p>
          </div>
          <div className="absolute bottom-10 left-20 right-20 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-1/3"></div>
          </div>
        </div>

        <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/60">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-[#2D1B15] mb-4 tracking-tight">
              {isLogin ? "Welcome Back" : "Start Journey"}
            </h2>
            <p className="text-[#8D6E63] font-bold">
              {isLogin ? "New here?" : "Already a member?"} 
              <span 
                onClick={() => setIsLogin(!isLogin)}
                className="text-rose-500 ml-2 cursor-pointer hover:underline"
              >
                {isLogin ? "Create an account" : "Login instead"}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <input 
                  type="text" 
                  name="name" // Name attribute added
                  value={name}
                  onChange={onChange}
                  placeholder="Full Name" 
                  className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" 
                  required
                />
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
              </div>
            )}

            <div className="relative">
              <input 
                type="email" 
                name="email" // Name attribute added
                value={email}
                onChange={onChange}
                placeholder="Email Address" 
                className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" 
                required
              />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
            </div>

            <div className="relative">
              <input 
                type="password" 
                name="password" // Name attribute added
                value={password}
                onChange={onChange}
                placeholder="Password" 
                className="w-full bg-white border-2 border-transparent focus:border-rose-200 outline-none rounded-[30px] py-6 px-14 font-bold text-[#2D1B15] shadow-sm transition-all" 
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={24} />
            </div>

            <button type="submit" className="w-full bg-[#2D1B15] text-white py-7 rounded-[35px] font-black text-2xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group">
              {isLogin ? "Login Now" : "Sign Up"}
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[#8D6E63]/40 text-sm font-black uppercase tracking-widest">Secure E2E Encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const User = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default Login;