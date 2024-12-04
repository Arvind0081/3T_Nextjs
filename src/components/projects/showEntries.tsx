'use client';
import React,{useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ShowEntries = ({ data }: any) => {
  const [pageSize,setPageSize]=useState(data?.pageSize);
  const router = useRouter();
  const url = usePathname();
 

  const handlePageSize = (value: any) => {
    setPageSize(value);
    return router.push(
      `${url}/?page=${1}&size=${value}&status=${data.projectStatus}&search=${data.searchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`
    );
  };

  return (
    <div className='d-flex gap-x-2 align-items-center mb-4'>
      Show
      <select
        className='form-control w70'
        value={pageSize}
        onChange={(e) => handlePageSize(e.target.value)}
      >
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
        <option value='200'>200</option>
      </select>{' '}
      entries
    </div>
  );
};

export default ShowEntries;