
'use client';
import React,{useState,useEffect} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { deleteCookie, setCookie ,getCookie} from 'cookies-next';
const FilterManager = ({ list }: any) => {

  
  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams);
 
  //const cookieValue = getCookie('manager')?.toString();
  const cookieValue =currentParams.get('teamAdminId') ?? getCookie('manager')?.toString();
  const [manager, setManager] = useState(cookieValue??'');


 useEffect(()=>{
  handleChangeManager();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[manager]);

  const handleChangeManager = () => {
   
   // const manager = event.target.value;
  
    setManager(manager);
    if (manager) {
   
      setCookie('manager', manager);
      currentParams.set('teamAdminId',manager);//`${url}?tab=${activeTab}&teamAdminId=${manager}`;
    }
    else{

      deleteCookie('manager');
     currentParams.delete('teamAdminId');
    }

    const newUrl = `${url}?${currentParams.toString()}`;
   
    router.push(newUrl);
  };

  return (
    <div>
      <select
        className='form-control ProjectManager_control'
        value={manager}
        onChange={(e)=>setManager(e.target.value)}
      >
        <option value=''>All</option>
        {list?.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterManager;
