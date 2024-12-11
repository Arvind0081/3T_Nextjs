'use client';

import React, {useState} from 'react';
import EditUpworkForm from './editUpworkForm';
import { DepartmentModel } from '@/utils/types';
import apiService from '@/services/apiService';
import { getUpworkProfileById } from '../common/constant';

type Props = {
  id: string;
  getDepartment:DepartmentModel[];
  profileList:any
};

const EditButton = ({ id,getDepartment,profileList }: Props) => {
  const [show, setShow] = useState(false);
   const [upworkProfileData, setupworkProfileData] = useState(null);


  const fetchClientData = async () => {
    
    try {
      const data = await apiService.get(`${getUpworkProfileById}=${id}`);
    
      setupworkProfileData(data.model);
      setShow(true);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };


  return (
    <>
      {show && (
        <EditUpworkForm
          name='Edit Client'
          departmentData={getDepartment}
         id={id}
          show={show}
          setShow={setShow}
          upworkProfileData={upworkProfileData}
          profileList={profileList}
          
        />
      )}
      <button className='icon_btn icon_PrimaryBtn' onClick={fetchClientData}>
        <i className='bi bi-pencil-square'></i>
      </button>
    </>
  );
};

export default EditButton;
