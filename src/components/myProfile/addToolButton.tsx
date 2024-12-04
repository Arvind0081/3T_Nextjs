'use client';
import React, { useState } from 'react';
import {Technology } from '@/utils/types';
import AddToolForm from './addToolForm';
type Props={
  id:string;
  technologies:Technology[];

}

const AddToolButton = ({id,  technologies}:Props) => {
  
  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <AddToolForm
          name='Add Tools'
          show={show}
          setShow={setShow}
          placement='end'
          technologies={technologies}
          id={id}

        />
      )}

      <button onClick={showModal} className='btn btn-bd-primaryadd' style={{ backgroundColor: '#7952b3', color: 'white' }}>
      <i className="bi bi-plus-lg"></i> Add Tools
      </button>
    </>
  );
};

export default AddToolButton;