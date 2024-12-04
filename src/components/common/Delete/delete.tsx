//components/commonComponets/Delete
'use client';
import React, { useState } from 'react';
import DeleteModal from '@/components/common/Modal/deleteModal';

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [show, setShow] = useState(false);

  const showModal = async () => {
      setShow(true);
       
  };

  return (
    <>
    {show && <DeleteModal show ={show} setShow ={setShow} id={id}/>}
      <button className='btn btn-icon btn-wave waves-effect waves-light btn-xs btn-danger-transparent btn-sm-badge' onClick={() => showModal()}> Delete
      {/* <i className="bi bi-trash text-red"></i> */}
      </button>
    </>
  );

};
export default DeleteButton;
