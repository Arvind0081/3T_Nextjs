'use client';
import apiService from '@/services/apiService';
import { individualProject } from '@/utils/publicApi';
import { StatusModel } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProjectStatusDropdown = ({
  id,
  projectStatusData,
  projectStatus,
}: any) => {
  const [status, setStatus] = useState(projectStatus);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
  const router = useRouter();

  const handleChangeStatus = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setStatus(value);
    setSelectedProjectId(id);
  };

  useEffect(() => {
    if (selectedProjectId) {
      individualProjectDetail();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId]);

  const individualProjectDetail = async () => {
    const response = await individualProject(selectedProjectId);

    const payLoad = { ...response, projectStatus: Number(status) };
    try {
      await apiService.put('/Project/UpdateProject', payLoad);
      router.refresh();
      setSelectedProjectId(0);
    } catch (error) {
      handleClose();
    }
  };

  const handleClose = () => {
    setStatus(projectStatus);
    setSelectedProjectId(0);
  };
  return (
    <select
      className='form-control w120'
      value={status}
      onChange={handleChangeStatus}
    >
      {projectStatusData.map((item: StatusModel) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default ProjectStatusDropdown;
