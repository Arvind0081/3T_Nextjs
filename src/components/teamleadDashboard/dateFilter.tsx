'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const DateFilter = ({dateStr}:any) => {
  const [currentMonth, setCurrentMonth] = useState('');
  const router = useRouter();
  useEffect(() => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    setCurrentMonth(dateStr);
  }, [dateStr]);

  const handleMonthChange = (e: any) => {
    const month = e.target.value;
    setCurrentMonth(month);
    router.push(`/teamLeadDashBoard?month=${month}`);
  };
  return (
    <>
      <div className='selectbox'>
        <p className='fw-semibold mb-2'>Select Month</p>
        <div className='input-group'>
          <input
            type='month'
            className='form-control'
            value={currentMonth}
            onChange={handleMonthChange}
          />
        </div>
      </div>
    </>
  );
};
export default DateFilter;
