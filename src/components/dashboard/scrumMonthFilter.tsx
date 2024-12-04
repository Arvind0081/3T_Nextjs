'use client';
import React, { useState ,useEffect} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import getUser from '@/utils/getUserClientSide';
const DateFilter = ({ month,payLoad }: any) => {
  const user: any = getUser();
  const [currentMonth, setCurrentMonth] = useState('');
  const router = useRouter();
  const url = usePathname();

  const handleDate = (e: { target: { value: any } }) => {
    const dateValue = e.target.value;
    setCurrentMonth(dateValue);
    user.role === 'Admin'?
    router.push(
      `${url}/?departmentId=${payLoad.departmentId}&startDate=${payLoad.startDate}&endDate=${payLoad.endDate}&date=${payLoad.filterByDate}&month=${dateValue}`
    ): router.push(
      `${url}/?startDate=${payLoad.startDate}&endDate=${payLoad.endDate}&date=${payLoad.filterByDate}&month=${dateValue}`
    );
  };

  useEffect(()=>{setCurrentMonth(month)},[month]);

  return (
    <>
      <div className='align-items-end d-flex gap-x-2 selectbox'>
      <p className="fw-semibold mb-2">Select Month</p>
      <div className="input-group date-selectbox">
      <input
            type='month'
            className='form-control'
            value={currentMonth}
            onChange={handleDate}
          />
          {/* <div className="input-group-text"><i className="ri-calendar-line"></i></div> */}
      </div>
        
      </div>
     
    </>
  );
};

export default DateFilter;
