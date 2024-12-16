'use client';
import React, { useState} from 'react';
import { DepartmentModel } from '@/utils/types';
import AddEditClientForm from '@/components/clients/addEditClientForm';
import apiService from '@/services/apiService';
import { getClientByID } from '../constant';

type Props = {
  id: string;
  department:DepartmentModel[]
};

const EditButton = ({ id ,department}: Props) => {
  const [show, setShow] = useState(false);
  const [clientData,setClientData]=useState();

  const showModal = async() => {
    try {
      const data= await apiService.get(`${getClientByID}=${id}`);
      setClientData(data.model);
      setShow(true);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
   
  };
  return (
    <>
      {show &&  (
        <AddEditClientForm 
          name='Edit Client' 
          departmentData={department}
          show={show} 
          setShow={setShow} 
          placement='end' 
          clientData={clientData}
          setClientData={setClientData}
        />
      )}
      <button className='icon_btn icon_PrimaryBtn' onClick={showModal}>
        <i className="bi bi-pencil-square"></i>
      </button>
    </>
  );
};

export default EditButton;
