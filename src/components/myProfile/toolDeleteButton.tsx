//components/commonComponets/Delete
'use client';
import React, { useState } from 'react';
import DeleteToolForm from './deleteToolForm';
type Props = {
  id: string;
};

const  ToolDeleteButton = ({ id }: Props) => {
  const [show, setShow] = useState(false);

  const showModal = async () => {
      setShow(true);
       
  };

  return (
    <>
    {show && <DeleteToolForm show ={show} setShow ={setShow} id={id}/>}
      <button  onClick={() => showModal()}>
      <i className="bi bi-trash"></i>
      </button>
    </>
  );

};
export default ToolDeleteButton;