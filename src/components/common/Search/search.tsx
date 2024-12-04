//components/commomnComponents/searchInput

'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
 
const Search = ({ payload }: any) => {
  const router = useRouter();
  const url = usePathname();
 
  const [searchQuery, setSearchQuery] = useState(payload?.searchValue || '');
 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
 
      router.push(
        `${url}?page=${payload?.pagenumber}&size=${payload.pageSize}&empStatus=${payload.isActive}&departmentId=${payload.departmentID}&designation=${payload.designation}&searchValue=${trimmedQuery}&sortColumn=${payload.SortColumn}&sortOrder=${payload.SortOrder}`
      );
    }, 500);
 
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, url, payload]);
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
 
  return (
    <div>
      <input
        className="form-control"
        type="text"
        value={searchQuery}
        placeholder="Search Here"
        onChange={handleChange}
      />{' '}
      <i className="bi bi-search"></i>
    </div>
  );
};
 
export default Search;