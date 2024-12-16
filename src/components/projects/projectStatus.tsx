'use client';
import { StatusModel } from '@/utils/types';
import React,{useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ProjectStatus = ({ statusData, data}: any) => {
  const [status,setStatus]=useState(data.projectStatus);
  const router = useRouter();
  const url = usePathname();

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusId = Number(e.target.value);
    setStatus(e.target.value);
    router.push(
      `${url}/?page=${1}&size=${data.pageSize}&status=${statusId}&search=${data.searchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&departmentId=${data.departmentId}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`
    );
  };
  

  return (
    <div className='selectbox open_selectBox'>
      <select
        className='form-control'
        value={status}
        onChange={(e) => handleStatus(e)}
      >
        {statusData?.map((item: StatusModel) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectStatus;
