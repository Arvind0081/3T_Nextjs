'use client';
import React, { useState } from 'react';
import AddProjectForm from './addEditProjectForm';
import { ProjectModel, Technology } from '@/utils/types';
// import { DepartmentModel } from '@/utils/types';
type Props={
  id:string;
  projectDetails:ProjectModel[];
  technologies:Technology[];

}

const AddProjectButton = ({id,  projectDetails, technologies}:Props) => {
  
  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <AddProjectForm
          name='Add Project'
          show={show}
          setShow={setShow}
          placement='end'
          projectDetails={projectDetails}
          technologies={technologies}
          id={id}

        />
      )}

      <button onClick={showModal} className='btn btn-bd-primaryadd' style={{ backgroundColor: '#7952b3', color: 'white' }}>
      <i className="bi bi-briefcase"></i> Add Your Project
      </button>
    </>
  );
};

export default AddProjectButton;