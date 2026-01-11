import { Heart, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Add this to your Dashboard.js cycle section
// Replace the entire cycle-section with this

const CycleSection = ({ userData }) => {
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <section id="cycle-section" className="scroll-mt-60 mb-20 -ml-14 relative">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 pl-8 lg:pl-20 pr-8 lg:pr-20 gap-6">
        <div className="relative">
          <p className="text-rose-500 font-black uppercase text-xs tracking-[0.3em] mb-2">12 MONTH OVERVIEW</p>
          <h3 className="text-6xl font-black text-[#2D1B15] tracking-tight">
            Cycle Timeline
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
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
        </div>
      </div>
      
      
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory pl-8 lg:pl-20">
          {Array.from({ length: 12 }).map((_, monthOffset) => {
            const displayDate = new Date(selectedYear, monthOffset, 1);
            const monthLabel = displayDate.toLocaleDateString('en-US', { month: 'short' });
            const yearLabel = displayDate.getFullYear();
            
           
            const monthGradients = [
              'from-rose-100/80 to-pink-100/60',      // Jan
              'from-pink-100/80 to-rose-100/60',      // Feb
              'from-rose-100/80 to-orange-100/60',    // Mar
              'from-pink-100/80 to-rose-100/60',      // Apr
              'from-rose-100/80 to-pink-100/60',      // May
              'from-pink-100/80 to-orange-100/60',    // Jun
              'from-orange-100/80 to-rose-100/60',    // Jul
              'from-rose-100/80 to-pink-100/60',      // Aug
              'from-pink-100/80 to-rose-100/60',      // Sep
              'from-orange-100/80 to-rose-100/60',    // Oct
              'from-rose-100/80 to-pink-100/60',      // Nov
              'from-pink-100/80 to-purple-100/60',    // Dec
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
                  className={`aspect-square flex items-center justify-center text-sm font-bold rounded-full transition-all cursor-default
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
              <div key={monthOffset} className="min-w-[420px] max-w-[420px] snap-center flex-shrink-0">
                <div className={`bg-gradient-to-br ${monthGradients[monthOffset]} backdrop-blur-xl rounded-[45px] p-8 shadow-xl border-2 border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full`}>
                  
                  
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                  
                 
                  <div className="text-center mb-6 relative z-10">
                    <div className="inline-block bg-white/90 backdrop-blur-sm px-5 py-2 rounded-[20px] shadow-lg border border-white mb-3">
                      <p className="text-[9px] font-black text-rose-400 uppercase tracking-[0.3em]">{yearLabel}</p>
                      <h4 className="text-3xl font-black text-[#2D1B15] uppercase tracking-tight">
                        {monthLabel}
                      </h4>
                    </div>
                  </div>

                  
                  <div className="bg-white/70 backdrop-blur-md rounded-[35px] p-7 shadow-inner relative z-10">
                   
                    <div className="grid grid-cols-7 gap-3 mb-5">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-xs font-black text-rose-500 uppercase">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    
                    <div className="grid grid-cols-7 gap-3">
                      {days}
                    </div>
                  </div>
                  
                  
                  <div className="mt-5 flex items-center justify-center gap-2 relative z-10">
                    <Heart size={12} className="text-rose-400 fill-rose-400" />
                    <span className="text-[10px] font-bold text-[#2D1B15]/60 uppercase tracking-wider">Track & Shine</span>
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