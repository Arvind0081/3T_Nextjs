'use client';
import React, { useState ,useEffect} from 'react';
import { useRouter, usePathname } from 'next/navigation';

const OverallPerformanceDateFilter = ({ month }: any) => {

  const [currentMonth, setCurrentMonth] = useState('');
  const router = useRouter();
  const url = usePathname();

  const handleDate = (e: { target: { value: any } }) => {
    const dateValue = e.target.value;
    setCurrentMonth(dateValue);
    router.push(
      `${url}/?month=${dateValue}`
    );
  };

  useEffect(()=>{setCurrentMonth(month)},[month]);

  return (  
    <>
      <div className='selectbox'>
        
          <input
            type='month'
            className='form-control'
            value={currentMonth}
            onChange={handleDate}
          />
      </div>
     
    </>
  );
};

export default OverallPerformanceDateFilter;
