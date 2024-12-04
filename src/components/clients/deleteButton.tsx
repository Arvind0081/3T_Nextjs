//components/commonComponets/Delete
'use client';
import React, { useState } from 'react';
import DeleteClientForm from '@/components/clients/deleteClientForm';
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
    {show && <DeleteClientForm show ={show} setShow ={setShow} id={id}/>}
      <button  onClick={() => showModal()}>
      <i className="bi bi-trash"></i>
      </button>
    </>
  );

};
export default DeleteButton;
