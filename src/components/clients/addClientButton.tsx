'use client';
import React, { useState } from 'react';
import AddEditClientForm from '@/components/clients/addEditClientForm';
// import { DepartmentModel } from '@/utils/types';

const AddClientButton = ({department}:any) => {
  
  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <AddEditClientForm
          name='Add Client'
          departmentData={department}
          show={show}
          setShow={setShow}
          placement='end'
        />
      )}

      <button onClick={showModal} className='btn btn-bd-primaryadd' style={{ backgroundColor: '#7952b3', color: 'white' }}>
        <i className='bi bi-person-add'></i> Add Client
      </button>
    </>
  );
};

export default AddClientButton;