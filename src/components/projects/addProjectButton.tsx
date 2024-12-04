'use client'
import React,{useState} from 'react'
import ProjectAddEditForm from './addEditProjectForm';
const AddProject=({projectStatusData,hiringType,billingType,clientList,applicationDomain,technologies}:any)=>{

    const [addEdit,setAddEdit]=useState(false);
    return (
        <div className='btn-list mt-md-0 mt-2'>
        <button
            type='button'
            className='btn btn-primary btn-wave'
            data-bs-toggle='offcanvas'
            data-bs-target='#AddNewProjectModal'
            aria-controls='AddNewProjectModal'
            onClick={() =>
                setAddEdit(true)
            }
        >
           <i className="bi bi-briefcase-fill"></i>

            Add Projects
        </button>

<ProjectAddEditForm addEdit={addEdit} setAddEdit={setAddEdit} projectStatusData={projectStatusData} hiringType={hiringType} billingType={billingType} clientList={clientList} applicationDomain={applicationDomain} technologies={technologies} />
        
    </div>
    )
}

export default AddProject;