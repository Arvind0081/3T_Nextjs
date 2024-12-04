'use client'
import React,{useState,useEffect} from 'react';
import { useRouter,usePathname } from 'next/navigation';
 
 const Search =({data}:any)=>{
 const router = useRouter();
 const url=usePathname();

    const [searchValue,setSearchValue]=useState(data.searchValue);
    const [debounceSearchValue,setDebounceSearchValue]=useState('');


    useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                setDebounceSearchValue(searchValue);
            }, 1000);
    
            return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    useEffect(() => {
        PageReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchValue]);

    const PageReload=()=>{
       return router.push(`${url}/?page=${1}&size=${data.pageSize}&status=${data.projectStatus}&search=${debounceSearchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`);
    };

    
    return (
        <div className='search_box'>
        <i className='ri-search-line'></i>
        <input
            className='form-control form-control-sm'
            type='text'
            placeholder='Search Here'
            value={searchValue}
            onChange={(e) =>setSearchValue(e.target.value)}
        />
    </div>
    )
}

export default Search;