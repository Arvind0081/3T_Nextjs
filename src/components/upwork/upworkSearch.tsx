'use client';
import React, { useState } from 'react'; // Import React for TypeScript typing
import { useRouter, usePathname } from 'next/navigation';

const UpworkSearch = ({params}:any) => {
  const router = useRouter();
  const url = usePathname();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    router.push(
      `${url}?search=${newSearch}&page=1&size=${params.pageSize}&departmentId=${params.departmentID}&teamAdminId=${params.teamAdminId}&profileType=${params.profileType}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`
    );
  };

 
  return (
    <div className='search_box mb-4'>
      <i className='ri-search-line'></i>
      <input
        className='form-control'
        type='text'
        placeholder='Search Here'
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default UpworkSearch;
