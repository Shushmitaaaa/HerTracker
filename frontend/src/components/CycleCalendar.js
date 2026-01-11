

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CycleCalendar = ({ lastPeriodDate, periodLength }) => {
  
  const isPeriodDay = (currentDate) => {
    if (!lastPeriodDate) return false;

    const start = new Date(lastPeriodDate);
    const end = new Date(lastPeriodDate);
    
    end.setDate(start.getDate() + (periodLength || 5));

    
    const checkDate = new Date(currentDate).setHours(0, 0, 0, 0);
    const startDate = new Date(start).setHours(0, 0, 0, 0);
    const endDate = new Date(end).setHours(0, 0, 0, 0);

    return checkDate >= startDate && checkDate < endDate;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isPeriodDay(date)) {
      return 'period-highlight'; 
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-[0_15px_40px_rgba(255,182,193,0.15)] border border-white">
      <Calendar 
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
};

export default CycleCalendar;