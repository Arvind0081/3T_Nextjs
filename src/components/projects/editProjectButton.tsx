'use client';
import React, { useState } from 'react';
import ProjectAddEditForm from './addEditProjectForm';
import { ProjectInfoModel } from '@/utils/types';
import { individualProject } from '@/utils/publicApi';
const EditProject = ({
  id,
  projectStatusData,
  hiringType,
  billingType,
  clientList,
  paginationData,applicationDomain,technologies
}: any) => {
  const [addEdit, setAddEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInfoModel>();

  const handleClick = async () => {
    const response = await individualProject(id);
    if (response) {
      setSelectedProject(response);
      setAddEdit(true);
    }
  };

  return (
    <div className='btn-list mt-md-0 mt-2'>
      <a
        aria-label='anchor'
        onClick={() => handleClick()}
        className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light'
        data-bs-toggle='offcanvas'
        data-bs-target='#UpdateProjectModal'
        aria-controls='UpdateProjectModal'
      >
        <i className='bi bi-pencil-square'></i>
      </a>

      <ProjectAddEditForm
        addEdit={addEdit}
        setAddEdit={setAddEdit}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        projectStatusData={projectStatusData}
        hiringType={hiringType}
        billingType={billingType}
        clientList={clientList}
        paginationData={paginationData}
        applicationDomain={applicationDomain}
        technologies={technologies}
      />
    </div>
  );
};

export default EditProject;
