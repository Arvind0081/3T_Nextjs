'use client'
import React, { useState } from 'react'
import DeleteModal from './deleteModal';
import apiService from '@/services/apiService';
import {useRouter} from 'next/navigation';

const DeleteButton=({id}:any)=>{
    const router=useRouter();
const [selectedId,setSelectedId]=useState(0);
const [showModal,setShowModal]=useState(false);

    const handleDelete=()=>{
        setSelectedId(id);
        setShowModal(true);
    };

    const handleClose=()=>{
        setSelectedId(0);
        setShowModal(false);
      };
      const handleDeleteRecord=async()=>{
        await apiService.delete(`/ProjectModule/DeleteProjectModule?moduleId=${selectedId}`);
        router.refresh();
        handleClose();
      };

    return(
        <>
         <a
                                                                                    aria-label='anchor'
                                                                                    className='btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-transparent btn-sm-badge'
                                                                                   onClick={handleDelete}
                                                                                > <i className="bi bi-trash"></i>
                                                                                </a>
            < DeleteModal showModal={showModal} handleClose={handleClose} handleDeleteRecord={handleDeleteRecord} />                                                                    
        </>
    )
}
export default DeleteButton;