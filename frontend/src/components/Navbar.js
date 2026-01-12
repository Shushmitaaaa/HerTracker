
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, MessageCircle, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState('Today');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/chat') setActiveTab('Assistant');
    else if (path === '/profile') setActiveTab('Me');
    else setActiveTab('Today');
  }, [location.pathname]);

  const navItems = [
    { name: 'Today', path: '/dashboard', icon: Home },
    { name: 'Cycle', path: 'cycle-section', icon: Calendar },
    { name: 'Assistant', path: '/chat', icon: MessageCircle },
    { name: 'Me', path: '/profile', icon: User },
  ];

  const handleNavClick = (path, name) => {
    if (name === 'Cycle') {
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
        setActiveTab('Today');
      } else {
        navigate('/dashboard#cycle-section');
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
    <nav className="flex items-center justify-center gap-1 md:gap-2 bg-white/70 backdrop-blur-2xl border border-white/80 p-1.5 md:p-2 rounded-[30px] md:rounded-[40px] shadow-2xl">
      {navItems.map((item) => {
        const isHighlighted = hoveredTab === item.name || (activeTab === item.name && hoveredTab === null);
        const Icon = item.icon;
        
        return (
          <button 
            key={item.name} 
            onMouseEnter={() => setHoveredTab(item.name)}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleNavClick(item.path, item.name)}
            className={`px-3 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] text-[9px] sm:text-[10px] md:text-[14px] lg:text-[15px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] lg:tracking-[0.2em] transition-all duration-300 ease-out cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${
              isHighlighted 
                ? 'bg-[#2D1B15] text-white shadow-xl scale-105' 
                : 'text-[#2D1B15]/70 hover:text-[#2D1B15]' 
            }`}
          >
            
            <Icon className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6"  />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;