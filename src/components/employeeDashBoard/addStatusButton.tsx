'use client';
import React, { useState } from 'react';
import AddStatusForm from './addStatusForm';

const AddStatusButton = ({empProjectList,empProfileList}:any) => {
  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <AddStatusForm
          name='Add Status'
          show={show}
          setShow={setShow}
          empProjectList={empProjectList}
          empProfileList={empProfileList}
        
          placement='end'
        />
      )}

      <button
        onClick={showModal}
        type='button'
        className='btn btn-primary btn-wave'
        data-bs-toggle='offcanvas'
        data-bs-target='#AddStatusModal'
        aria-controls='AddStatusModal'
       
      >
        <i className='bi bi-plus-lg'></i>
        Add Status
      </button>
    </>
  );
};

export default AddStatusButton;
