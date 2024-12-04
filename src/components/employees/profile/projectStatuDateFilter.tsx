'use client';
import React, { useState ,useEffect} from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ProjectStatuDateFilter = ({ month }: any) => {

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
        <p className='fw-semibold mb-2'></p>
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

export default ProjectStatuDateFilter;
