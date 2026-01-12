
import { Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const CycleSection = ({ userData }) => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const scrollContainerRef = useRef(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="cycle-section" className="scroll-mt-60 mb-3 md:-ml-14 sm:mb-4 md:mb-6 relative">
      
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-10 px-4 sm:px-6 md:px-8 lg:pl-20 lg:pr-20 gap-4 md:gap-6">
        <div className="relative w-full lg:w-auto">
          {/* <p className="text-rose-500 font-black uppercase text-[12px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] mb-1 sm:mb-2">
            12 MONTH OVERVIEW
          </p> */}
          <h3 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2D1B15] tracking-tight">
            Cycle Timeline
          </h3>
        </div>
        
        
        <div className="lg:hidden w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-lg px-3 py-2 rounded-[18px] border border-white/80 shadow-sm">
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-sm"></div>
              <span className="text-[11px] font-bold text-[#2D1B15]">Period</span>
            </div>
            <div className="w-px h-3 bg-rose-200"></div>
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-rose-100 rounded-full border-2 border-rose-300"></div>
              <span className="text-[11px] font-bold text-[#2D1B15]">Today</span>
            </div>
          </div>

          
          <div className="relative">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-white/80 backdrop-blur-lg pl-4 pr-9 py-2 rounded-[18px] border-2 border-rose-200 shadow-sm text-xs font-bold text-[#2D1B15] cursor-pointer hover:border-rose-300 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value={2025} className="bg-white text-[#2D1B15] font-bold">2025</option>
               <option value={2026} className="bg-white text-[#2D1B15] font-bold">2026</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" />
          </div>
        </div>

       
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-white/80 backdrop-blur-lg pl-5 pr-12 py-3 rounded-[25px] border-2 border-rose-200 shadow-sm text-sm font-bold text-[#2D1B15] cursor-pointer hover:border-rose-300 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" />
          </div>

          
          <div className="flex items-center gap-6 bg-white/60 backdrop-blur-lg px-6 py-3 rounded-[25px] border border-white/80 shadow-sm">
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-sm"></div>
              <span className="text-sm font-bold text-[#2D1B15]">Period</span>
            </div>
            <div className="w-px h-5 bg-rose-200"></div>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-rose-100 rounded-full border-2 border-rose-300"></div>
              <span className="text-sm font-bold text-[#2D1B15]">Today</span>
            </div>
          </div>

          
          <button 
            onClick={scrollRight}
            className="flex items-center gap-1.5 bg-rose-500 text-white px-4 py-3 rounded-[25px] shadow-md hover:bg-rose-600 transition-all text-sm font-bold"
          >
            Scroll
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
    
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 md:pb-8 snap-x snap-mandatory pl-4 sm:pl-6 md:pl-8 lg:pl-20"
        >
          {Array.from({ length: 12 }).map((_, monthOffset) => {
            const displayDate = new Date(selectedYear, monthOffset, 1);
            const monthLabel = displayDate.toLocaleDateString('en-US', { month: 'short' });
            const yearLabel = displayDate.getFullYear();
            
            const monthGradients = [
              'from-rose-100/80 to-pink-100/60',
              'from-pink-100/80 to-rose-100/60',
              'from-rose-100/80 to-orange-100/60',
              'from-pink-100/80 to-rose-100/60',
              'from-rose-100/80 to-pink-100/60',
              'from-pink-100/80 to-orange-100/60',
              'from-orange-100/80 to-rose-100/60',
              'from-rose-100/80 to-pink-100/60',
              'from-pink-100/80 to-rose-100/60',
              'from-orange-100/80 to-rose-100/60',
              'from-rose-100/80 to-pink-100/60',
              'from-pink-100/80 to-purple-100/60',
            ];
            
            const firstDay = new Date(selectedYear, monthOffset, 1).getDay();
            const daysInMonth = new Date(selectedYear, monthOffset + 1, 0).getDate();
            const today = new Date();
            
            const isPeriodDay = (day) => {
              if (!userData?.lastPeriodDate) return false;
              
              const checkDate = new Date(selectedYear, monthOffset, day);
              const lastPeriod = new Date(userData.lastPeriodDate);
              const cycleLength = userData.cycleLength || 28;
              const periodLength = userData.periodLength || 5;
              const daysDiff = Math.floor((checkDate - lastPeriod) / (1000 * 60 * 60 * 24));
              const dayInCycle = ((daysDiff % cycleLength) + cycleLength) % cycleLength;
              
              return dayInCycle >= 0 && dayInCycle < periodLength;
            };
            
            const isToday = (day) => {
              return today.getDate() === day && 
                     today.getMonth() === monthOffset && 
                     today.getFullYear() === selectedYear;
            };
            
            const days = [];
            for (let i = 0; i < firstDay; i++) {
              days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
              const isPeriod = isPeriodDay(day);
              const isTodayDate = isToday(day);
              
              days.push(
                <div 
                  key={day}
                  className={`aspect-square flex items-center justify-center text-xs sm:text-sm font-bold rounded-full transition-all cursor-default
                    ${isPeriod ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md' : ''}
                    ${isTodayDate && !isPeriod ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-400' : ''}
                    ${!isPeriod && !isTodayDate ? 'text-[#2D1B15] hover:bg-rose-50/50 hover:scale-105' : ''}
                  `}
                >
                  {day}
                </div>
              );
            }

            return (
              <div key={monthOffset} className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[420px] max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] snap-center flex-shrink-0">
                <div className={`bg-gradient-to-br ${monthGradients[monthOffset]} backdrop-blur-xl rounded-[30px] sm:rounded-[35px] md:rounded-[40px] lg:rounded-[45px] p-4 sm:p-6 md:p-7 lg:p-8 shadow-xl border-2 border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full`}>
                  
                 
                  <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/30 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-white/20 rounded-full blur-xl"></div>
                  
                  
                  <div className="text-center mb-4 sm:mb-5 md:mb-6 relative z-10">
                    <div className="inline-block bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-lg border border-white mb-2 sm:mb-3">
                      <p className="text-[8px] sm:text-[9px] font-black text-rose-400 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                        {yearLabel}
                      </p>
                      <h4 className="text-2xl sm:text-2xl md:text-3xl font-black text-[#2D1B15] uppercase tracking-tight">
                        {monthLabel}
                      </h4>
                    </div>
                  </div>

                  
                  <div className="bg-white/70 backdrop-blur-md rounded-[25px] sm:rounded-[30px] md:rounded-[35px] p-4 sm:p-5 md:p-6 lg:p-7 shadow-inner relative z-10">
                    <div className="grid grid-cols-7 gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-4 md:mb-5">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-[10px] sm:text-xs font-black text-rose-500 uppercase">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    
                    <div className="grid grid-cols-7 gap-2 sm:gap-2.5 md:gap-3">
                      {days}
                    </div>
                  </div>
                  
                 
                  <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 relative z-10">
                    <Heart size={10} className="sm:w-3 sm:h-3 text-rose-400 fill-rose-400" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#2D1B15]/60 uppercase tracking-wider">
                      Track & Shine
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar {
          scroll-behavior: smooth;
          scroll-padding: 2rem;
        }
      `}</style>
    </section>
  );
};

export default CycleSection;