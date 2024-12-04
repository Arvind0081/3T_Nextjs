'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const DateFilter = ({ payLoad }: any) => {
  const router = useRouter();
  const url = usePathname();

  const handleDate = (e: { target: { value: any } }) => {
    const dateValue = e.target.value;
    router.push(`${url}/?date=${dateValue}`);
  };

  return (
    <>
      <div className='align-items-end d-flex gap-x-2 selectbox'>
        <div className='input-group date-selectbox'>
          <input
            type='date'
            className='form-control'
            value={payLoad.filterByDate}
            onChange={handleDate}
          />
        </div>
      </div>
    </>
  );
};

export default DateFilter;
