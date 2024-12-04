'use client';

import React, {  useState } from 'react';
import apiService from '@/services/apiService';
import {  UserProfileDetail } from '@/components/common/constant';
import EditProfileForm from '@/components/myProfile/editProfileForm';
import { DepartmentModel, DesignationModel, Technology } from '@/utils/types';

type Props = {
  id:string;
    department:DepartmentModel[];
    designation:DesignationModel[];
     technologies: Technology[];
  };
  


const EditButton = ({department,designation,technologies}:Props) => {

  const [show, setShow] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);



  const EditUserProfile = async () => {
    try {
 
      const data = await apiService.get(`${UserProfileDetail}`);
      setUserProfileData(data.model.userProfile);
      setShow(true);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  return (
    <>
      {show && (
        <EditProfileForm
          name='Edit User'
          show={show}
          setShow={setShow}
          userProfileDetail={userProfileData}
          department={department}
          designation={designation}
          technologies={technologies}
        
        />
      )}
      <button onClick={EditUserProfile}>
        <i className='bi bi-pencil-square'></i>
      </button>
    </>
  );
};

export default EditButton;
