'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const DateFilter = ({ data }: any) => {
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const router = useRouter();
  const url = usePathname();

  const handleStartDate = (e: { target: { value: any } }) => {
    const startDateValue = e.target.value;
    setStartDate(startDateValue);
    router.push(
      `${url}/?page=${1}&size=${data.pageSize}&status=${
        data.projectStatus
      }&search=${
        data.searchValue
      }&startDate=${startDateValue}&endDate=${endDate}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`
    );
  };

  const handleEndDate = (e: { target: { value: any } }) => {
    const endDateValue = e.target.value;
    setEndDate(endDateValue);
    router.push(
      `${url}/?page=${1}&size=${data.pageSize}&status=${
        data.projectStatus
      }&search=${
        data.searchValue
      }&startDate=${startDate}&endDate=${endDateValue}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`
    );
  };

  return (
    <>
      <div className='selectbox'>
        <p className='fw-semibold'>Start Date</p>
        <div className='input-group date-selectbox'>
          <input
            type='date'
            className='form-control'
            value={startDate}
            onChange={handleStartDate}
          />
        </div>
      </div>
      <div className='selectbox'>
        <p className='fw-semibold'>End Date</p>
        <div className='input-group date-selectbox'>
          <input
            type='date'
            className='form-control'
            value={endDate}
            onChange={handleEndDate}
          />
        </div>
      </div>
    </>
  );
};

export default DateFilter;