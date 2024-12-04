'use client'

import { individualProjectModule } from '@/utils/publicApi';
import React,{useState} from 'react'
import AddEditProjectModule from './addEditProjectModuleForm';
import { format } from 'date-fns';
import { AddProjectModuleFormValues } from '@/utils/types';

const EditModule=({id,departmentId,projectId,projectModuleStatus,projectPaymentsStatus}:any)=>{

    const [selectedProjectModule,setSelectedProjectModule]=useState<AddProjectModuleFormValues>();
    const [addModule,setAddModule]=useState(false);
    const  handleClick=async()=>{
        const response =await individualProjectModule(id,departmentId);
        if(response){
            const data= {...response,
                deadline:format(new Date(response.deadline), 'yyyy-MM-dd'),
                approvalDate:format(new Date(response.approvalDate), 'yyyy-MM-dd'),
            }
            setSelectedProjectModule(data);
            setAddModule(true);
        }
    };

    return(
        <>
         <a aria-label="anchor"  onClick={() =>handleClick()}
        className="btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light"
        data-bs-toggle="offcanvas" data-bs-target="#UpdateClientModal"
        aria-controls="UpdateClientModal"> <i className="bi bi-pencil-square"></i></a>
        <AddEditProjectModule   projectId={projectId} addModule={addModule} setAddModule={setAddModule} selectedProjectModule={selectedProjectModule} setSelectedProjectModule={setSelectedProjectModule} projectModuleStatus={projectModuleStatus} projectPaymentsStatus={projectPaymentsStatus}/>
        </>
       
    )
}

export default EditModule;