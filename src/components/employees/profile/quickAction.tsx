'use client';
import React, { useEffect, useState } from 'react';
import {
  UpdateEmployeeByManager,
  UpdateEmployeeByStatus,
} from '@/utils/publicApi'; // Adjust the import path as needed
import getUser from '@/utils/getUserClientSide';
import Link from 'next/link';
import { UpdateEmployeeReq, UpdateManagerReq } from '@/utils/types';
import { useRouter } from 'next/navigation';
import ResetPassword from './resetPassword';

const QuickAction = ({ id, data, getManagerList, empstatus }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  
  useEffect(() => {
    setUser(getUser());
    setIsMounted(true);
  }, []);

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
   
    const newStatus = parseInt(event.target.value);
    const updateData: UpdateEmployeeReq = {
      employeeId: id,
      isActive: newStatus,
    };
    await UpdateEmployeeByStatus(updateData);
    router.refresh();
  };

  const handleManagerChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newManagerId = event.target.value;
    let getManagerId = getManagerList?.filter(
      (item: any) => item.name == newManagerId
    );
    const updateData: UpdateManagerReq = {
      employeeId: id,
      teamAdminId: getManagerId[0].id,
    };
    await UpdateEmployeeByManager(updateData);
    router.refresh();
  };

  if (!isMounted) {
    return null;
  }

  const handleChangePassword = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
    e.preventDefault();
    setShowModal(true);
};


  return (
    <div className='mb-0 profile-action'>
      {(user?.role === 'Project Manager' || user?.role === 'HOD' ) && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Status: </label>
            <select
              className='form-control'
              defaultValue={data ? data.isActive : ''}
              onChange={handleStatusChange}
            >
              {empstatus.model.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </span>
        </p>
      )}

      {(user?.role === 'Project Manager' || user?.role === 'HOD') && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Manager: </label>
            <select
              className='form-control'
              defaultValue={data ? data.manager : ''}
              onChange={handleManagerChange}
            >
              {getManagerList?.map((option: any, index: number) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </span>
        </p>
      )}

      {(user?.role === 'Project Manager' || user?.role === 'HOD') && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Status Update: </label>
            {data?.canEditStatus ? 'Yes' : 'No'}
          </span>
        </p>
      )}

      {(user?.role === 'Project Manager' || user?.role === 'HOD') && (
        <p className='fs-12 text-fixed-white mb-0 op-8 management-change'>
          <span className='me-3'>
            <label>Password: </label>
            <Link  className='badge bg-primary-transparent fs-12'
             href='#' 
              onClick={handleChangePassword}
           >
              Reset Here
            </Link>
          </span>
        </p>
      )}

      {user?.role === 'Team Lead' && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Status: </label>
            {data.isActive === 1
              ? 'Active'
              : data.isActive === 0
                ? 'Inactive'
                : ''}
          </span>
        </p>
      )}

      {user?.role === 'Team Lead' && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Manager: </label>
            {data.manager}
          </span>
        </p>
      )}

      {user?.role === 'Team Lead' && (
        <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
          <span className='me-3'>
            <label>Status Update: </label>
            {data?.canEditStatus ? 'Yes' : 'No'}
          </span>
        </p>
      )}

      <ResetPassword data={data} 
        show={showModal}
        setShow={setShowModal}/>
    </div>
  );
};

export default QuickAction;