import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // We still need the base logic

const CycleCalendar = () => {
  const [date, setDate] = useState(new Date());
  const periodDays = [15, 16, 17, 18]; 

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && periodDays.includes(date.getDate())) {
      return 'period-highlight'; 
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-[0_15px_40px_rgba(255,182,193,0.15)] border border-white">
      <Calendar 
        onChange={setDate} 
        value={date} 
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
};

export default CycleCalendar;