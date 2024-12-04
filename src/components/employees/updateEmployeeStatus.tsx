'use client';
// import apiService from '@/services/apiService';
import { updateEmployee } from '@/utils/publicApi';
import { UpdateEmpReq } from '@/utils/types';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';

const UpdateEmployeeStatus = ({ emp, empStatus }: any) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const searchValue = searchParams.get('search');
// const [currentStatus,setCurrentStatus] = useState('');

  const handleEmployeeStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>,employeeID: string) => {
    const status = event.target.value;
    // setCurrentStatus(status);
    const empUpdateReq: UpdateEmpReq = {
      employeeId: employeeID,
      isActive: status,
    };
    let isUpdateCase = employeeID != null || employeeID != undefined;
    if (isUpdateCase) {
      await updateEmployee(empUpdateReq);

      router.refresh();
    } else
      router.push(
        `employees?empStatus=${isUpdateCase ? emp?.empStatus : status}&dt=${new Date()}`
      );
  };

  return (
    <select
      className='form-control w150'
      value={ emp?.empStatus }
      onChange={(e) => handleEmployeeStatusChange(e, emp?.employeeID)}
    >
      {empStatus.model.map((option: any, index: number) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default UpdateEmployeeStatus;
