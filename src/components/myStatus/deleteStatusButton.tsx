'use client';
import React, { useState } from 'react';
import DeleteModal from '../projects/deleteModal';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ id, item, userId }: any) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [moduleID, setModuleID] = useState(item[0].moduleId);

  const handleDelete = () => {
    if (moduleID !== null) {
      setSelectedItem(id);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setSelectedItem('');
    setShowModal(false);
    setModuleID(null);
  };
  const handleDeleteRecord = async () => {
    await apiService.delete(
      `/EmployeeStatus/DeleteStatusByDate?UserProfileId=${userId}&ToDate=${selectedItem}`
    );
    router.refresh();
    handleClose();
  };

  return (
    <>
      <button
        aria-label='anchor'
        className='btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-transparent btn-sm-badge'
        onClick={handleDelete}
      >
        {' '}
        <i className='bi bi-trash'></i>
      </button>
      <DeleteModal
        showModal={showModal}
        handleClose={handleClose}
        handleDeleteRecord={handleDeleteRecord}
      />
    </>
  );
};
export default DeleteButton;
