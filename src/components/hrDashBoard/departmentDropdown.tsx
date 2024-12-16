'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { deleteCookie, setCookie, getCookie } from 'cookies-next';

const Department = ({ getDepartment, getManagerList, isUpworkProfile }: any) => {
  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams);

  const departmentCookieValue =
    currentParams.get('departmentId') ?? getCookie('departmentId')?.toString();
  const managerCookieValue =
    currentParams.get('teamAdminId') ?? getCookie('manager')?.toString();

  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentCookieValue ?? '1'
  );
  const [selectedManager, setSelectedManager] = useState(
    managerCookieValue ?? ''
  );

  useEffect(() => {
    handleDepartmentChange(selectedDepartment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

  useEffect(() => {
    handleManagerChange(selectedManager);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedManager]);

  const handleDepartmentChange = (value: any) => {
    if (value) {
      setCookie('departmentId', selectedDepartment);
      setSelectedDepartment(value);
      currentParams.set('departmentId', selectedDepartment);
      currentParams.delete('teamAdminId');
      deleteCookie('manager');
      setSelectedManager('');
    } else {
      deleteCookie('departmentId');
      currentParams.delete('departmentId');
    }

    const newUrl = `${url}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const handleManagerChange = (value: any) => {
    if (value) {
      setCookie('manager', selectedManager);
      setSelectedManager(value);
      currentParams.set('teamAdminId', selectedManager);
    } else {
      deleteCookie('manager');
      currentParams.delete('teamAdminId');
    }

    const newUrl = `${url}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className='d-flex department_Header'>
      <div className='selectbox'>
        <select
          className='form-control'
          value={selectedDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
        >
          <option value='' disabled>
            Select Department
          </option>
          {getDepartment?.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {!isUpworkProfile && ( // Conditionally hide manager dropdown
        <div className='selectbox'>
          <select
            className='form-control'
            value={selectedManager}
            onChange={(e) => handleManagerChange(e.target.value)}
            disabled={!selectedDepartment}
          >
            <option value=''>Select Manager</option>
            {getManagerList?.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Department;
