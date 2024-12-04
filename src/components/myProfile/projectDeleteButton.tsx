//components/commonComponets/Delete
'use client';
import React, { useState } from 'react';
import DeleteProjectForm from './deleteProjectForm';
type Props = {
  id: string;
};

const  ProjectDeleteButton = ({ id }: Props) => {
  const [show, setShow] = useState(false);

  const showModal = async () => {
      setShow(true);
       
  };

  return (
    <>
    {show && <DeleteProjectForm show ={show} setShow ={setShow} id={id}/>}
      <button  onClick={() => showModal()}>
      <i className="bi bi-trash"></i>
      </button>
    </>
  );

};
export default ProjectDeleteButton;
