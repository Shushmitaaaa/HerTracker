
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const navItems = [
//     { name: 'Today', path: '/' },
//     { name: 'Cycle', path: '/#cycle-section' },
//     { name: 'Assistant', path: '/chat' },
//     { name: 'Me', path: '/profile' },
//   ];

//   const handleNavClick = (path, name) => {
//     if (name === 'Cycle') {
//       // If we are on the dashboard, scroll down. 
//       // If not, go to dashboard first then scroll.
//       if (location.pathname === '/') {
//         const element = document.getElementById('cycle-section');
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       } else {
//         navigate('/');
//         // Timeout allows the Dashboard to load before attempting to scroll
//         setTimeout(() => {
//           document.getElementById('cycle-section')?.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//       }
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <nav className="flex items-center gap-3 bg-white/60 backdrop-blur-2xl border border-white/80 p-2.5 rounded-[40px] shadow-2xl transition-all duration-500 hover:shadow-rose-200/50">
//       {navItems.map((item) => {
//         // Logic to highlight 'Cycle' if we are scrolled to that section
//         const isActive = location.pathname === item.path;
        
//         return (
//           <button 
//             key={item.name} 
//             onClick={() => handleNavClick(item.path, item.name)}
//             className={`px-10 py-5 rounded-[30px] text-[13px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
//               isActive 
//                 ? 'bg-[#2D1B15] text-white shadow-xl scale-105' 
//                 : 'text-[#2D1B15]/40 hover:text-[#2D1B15] hover:bg-white/60 hover:scale-105'
//             }`}
//           >
//             {item.name}
//           </button>
//         );
//       })}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Local state for instant UI feedback (stops the lag)
  const [activeTab, setActiveTab] = useState('Today');

  // 2. Sync state if the user manually changes the URL or hits back/forward
  useEffect(() => {
    if (location.pathname === '/chat') setActiveTab('Assistant');
    else if (location.pathname === '/profile') setActiveTab('Me');
    else if (location.pathname === '/') {
      // If at top of page, it's Today; if scrolled to section, it's Cycle
      if (window.location.hash === '#cycle-section') {
        setActiveTab('Cycle');
      } else {
        setActiveTab('Today');
      }
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Today', path: '/' },
    { name: 'Cycle', path: 'cycle-section' },
    { name: 'Assistant', path: '/chat' },
    { name: 'Me', path: '/profile' },
  ];

  const handleNavClick = (path, name) => {
    // 3. Update state IMMEDIATELY on click to remove lag
    setActiveTab(name);

    if (name === 'Cycle') {
      const element = document.getElementById('cycle-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If navigate from another page to the cycle section
        navigate('/');
        setTimeout(() => {
          document.getElementById('cycle-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center gap-2 bg-white/70 backdrop-blur-2xl border border-white/80 p-2 rounded-[40px] shadow-2xl">
      {navItems.map((item) => {
        const isActive = activeTab === item.name;
        
        return (
          <button 
            key={item.name} 
            onClick={() => handleNavClick(item.path, item.name)}
            className={`px-10 py-5 rounded-[32px] text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-500 ease-in-out ${
              isActive 
                ? 'bg-[#2D1B15] text-white shadow-xl scale-105' 
                : 'text-[#2D1B15]/70 hover:text-[#2D1B15] hover:bg-white/40' 
                /* Increased from /40 to /70 for visibility */
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
