'use client';
import React, { useState } from 'react';
import { GetEmployeeStatusResponseModel } from '@/utils/types';
import AddEditStatusForm from './addEditStatusForm';
const EditStatus = ({
  item,
  projectsListFromDb,
  upwokProfileListFromDb,
}: any) => {
  const [show, setShow] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<GetEmployeeStatusResponseModel>();

  const handleClick = async () => {
    if (item[0].moduleId !== null) {
      setSelectedStatus(item);
      setShow(true);
    }
  };

  return (
    <div className='btn-list mt-md-0 mt-2'>
      <button
        aria-label='anchor'
        onClick={() => handleClick()}
        className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light'
        data-bs-toggle='offcanvas'
        data-bs-target='#UpdateProjectModal'
        aria-controls='UpdateProjectModal'
      >
        <i className='bi bi-pencil-square'></i>
      </button>

      <AddEditStatusForm
        show={show}
        setShow={setShow}
        projectsListFromDb={projectsListFromDb}
        upwokProfileListFromDb={upwokProfileListFromDb}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};

export default EditStatus;
