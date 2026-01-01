import React from 'react';
import { Home, Activity, Sparkles, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { icon: <Home size={18} />, path: '/', label: 'Today' },
    { icon: <Activity size={18} />, path: '/calendar', label: 'Cycle' },
    { icon: <Sparkles size={18} />, path: '/chat', label: 'AI' },
    { icon: <User size={18} />, path: '/profile', label: 'Me' },
  ];

  return (
    <nav className="flex items-center gap-1 bg-white/50 backdrop-blur-xl border border-white/60 p-1 rounded-full shadow-sm">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-[#2D1B15] text-white shadow-md' 
                : 'text-[#2D1B15]/40 hover:text-[#2D1B15] hover:bg-white/40'
            }`}
          >
            {item.icon}
            {isActive && (
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;