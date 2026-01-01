// import React from 'react';
// import { Home, Activity, Sparkles, User } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const navItems = [
//     { icon: <Home size={18} />, path: '/', label: 'Today' },
//     { icon: <Activity size={18} />, path: '/calendar', label: 'Cycle' },
//     { icon: <Sparkles size={18} />, path: '/chat', label: 'AI' },
//     { icon: <User size={18} />, path: '/profile', label: 'Me' },
//   ];

//   return (
//     <nav className="flex items-center gap-1 bg-white/50 backdrop-blur-xl border border-white/60 p-1 rounded-full shadow-sm">
//       {navItems.map((item) => {
//         const isActive = location.pathname === item.path;
//         return (
//           <Link 
//             key={item.path} 
//             to={item.path}
//             className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
//               isActive 
//                 ? 'bg-[#2D1B15] text-white shadow-md' 
//                 : 'text-[#2D1B15]/40 hover:text-[#2D1B15] hover:bg-white/40'
//             }`}
//           >
//             {item.icon}
//             {isActive && (
//               <span className="text-[10px] font-black uppercase tracking-[0.15em]">
//                 {item.label}
//               </span>
//             )}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Today', path: '/' },
    { name: 'Cycle', path: '/#cycle-section' },
    { name: 'Assistant', path: '/chat' },
    { name: 'Me', path: '/profile' },
  ];

  const handleNavClick = (path, name) => {
    if (name === 'Cycle') {
      // If we are on the dashboard, scroll down. 
      // If not, go to dashboard first then scroll.
      if (location.pathname === '/') {
        const element = document.getElementById('cycle-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        // Timeout allows the Dashboard to load before attempting to scroll
        setTimeout(() => {
          document.getElementById('cycle-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center gap-3 bg-white/60 backdrop-blur-2xl border border-white/80 p-2.5 rounded-[40px] shadow-2xl transition-all duration-500 hover:shadow-rose-200/50">
      {navItems.map((item) => {
        // Logic to highlight 'Cycle' if we are scrolled to that section
        const isActive = location.pathname === item.path;
        
        return (
          <button 
            key={item.name} 
            onClick={() => handleNavClick(item.path, item.name)}
            className={`px-10 py-5 rounded-[30px] text-[13px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
              isActive 
                ? 'bg-[#2D1B15] text-white shadow-xl scale-105' 
                : 'text-[#2D1B15]/40 hover:text-[#2D1B15] hover:bg-white/60 hover:scale-105'
            }`}
          >
            {item.name}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;