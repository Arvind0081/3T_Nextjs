'use client';
import React, { useState,useEffect } from 'react'; // Import React for TypeScript typing
import { useRouter, usePathname } from 'next/navigation';

const UpworkSearch = ({params}:any) => {
  const router = useRouter();
  const url = usePathname();
  const [searchInput, setSearchInput] = useState(params.searchValue);
  const [debounceSearchValue,setDebounceSearchValue]=useState('');

 
  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchInput(search);
  };


  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      setDebounceSearchValue(searchInput);
     
  }, 500);

  return () => clearTimeout(delayDebounceFn); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchInput]);

  useEffect(()=>{
    router.push(
      `${url}?search=${debounceSearchValue}&page=1&size=${params.pageSize}&departmentId=${params.departmentID}&teamAdminId=${params.teamAdminId}&profileType=${params.profileType}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debounceSearchValue]);


 
  return (
    <div className='search_box mb-4'>
      <i className='ri-search-line'></i>
      <input
        className='form-control'
        type='text'
        placeholder='Search Here'
        value={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
};

export default UpworkSearch;
