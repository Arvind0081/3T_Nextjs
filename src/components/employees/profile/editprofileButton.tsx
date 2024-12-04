'use client';

import React, {  useState } from 'react';
import EditProfileForm from './editProfileForm';
import { DepartmentModel, DesignationModel, StatusModel } from '@/utils/types';


type Props = {
  id: string;
  department:DepartmentModel[]
  empStatus:StatusModel[];
  designation:DesignationModel[];
  data:any;
  technologies:any
};


const EditButton = ({  id ,department, designation , empStatus ,data ,technologies}: Props) => {

  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <EditProfileForm
          name='Edit User'
          show={show}
          setShow={setShow}
          data={data}
          empStatus={empStatus}
          department={department} 
          designation={designation}
          id={id}
          technologies={technologies}
        />
      )}
      <button  onClick={showModal}>
        <i className='bi bi-pencil-square'></i>
      </button>
    </>
  );
};

export default EditButton;