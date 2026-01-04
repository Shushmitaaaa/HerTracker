

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for hover movement
  const [hoveredTab, setHoveredTab] = useState(null);
  // State for current page highlight
  const [activeTab, setActiveTab] = useState('Today');

  // Sync the brown pill with the current URL on page load/change
  useEffect(() => {
    const path = location.pathname;
    if (path === '/chat') setActiveTab('Assistant');
    else if (path === '/profile') setActiveTab('Me');
    else setActiveTab('Today');
  }, [location.pathname]);

  const navItems = [
    { name: 'Today', path: '/dashboard' },
    { name: 'Cycle', path: 'cycle-section' },
    { name: 'Assistant', path: '/chat' },
    { name: 'Me', path: '/profile' },
  ];


const handleNavClick = (path, name) => {
    if (name === 'Cycle') {
      const element = document.getElementById('cycle-section');
      if (element) {
        // Calculate where the element is + current scroll - a 150px gap
        const offset = 150; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveTab('Today');
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('cycle-section');
          if (el) {
            window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };



  return (
    <nav className="flex items-center gap-2 bg-white/70 backdrop-blur-2xl border border-white/80 p-2 rounded-[40px] shadow-2xl">
      {navItems.map((item) => {
        
        const isHighlighted = hoveredTab === item.name || (activeTab === item.name && hoveredTab === null);
        
        return (
          <button 
            key={item.name} 
            onMouseEnter={() => setHoveredTab(item.name)}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleNavClick(item.path, item.name)}
            className={`px-10 py-5 rounded-[32px] text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-out cursor-pointer ${
              isHighlighted 
                ? 'bg-[#2D1B15] text-white shadow-xl scale-105' 
                : 'text-[#2D1B15]/70 hover:text-[#2D1B15]' 
                /* text-[#2D1B15]/70 is now dark enough to be visible */
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
