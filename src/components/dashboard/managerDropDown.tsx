'use client';

import { Managers } from '@/utils/types';
import React, { useState } from 'react';
//import { useRouter } from 'next/navigation';

const ManagerDropdown = ({managers}: any) => {
  const [manager, setManager] = useState('');
  //const router = useRouter();

  const handleChangeManager = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setManager(value);
  };


  return (

    <div className='selectbox'>
                          <p className='fw-semibold mb-2'>Select Manager</p>
                          <select
      className='form-control'
      value={manager}
      onChange={handleChangeManager}
    >
         <option value={''}>All</option>
      {managers.map((item: Managers) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
                        </div>

   
  );
};

export default ManagerDropdown;
