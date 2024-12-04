'use client'
import React,{useState} from 'react';
import AddEditStatusForm from './addEditStatusForm';

const AddStatusButton=({projectsListFromDb,upwokProfileListFromDb}:any)=>{
const [show,setShow]=useState(false);
const handleShow=()=>{
    setShow(true);
}
    return(
        <>
        <div className="btn-list mt-md-0 mt-2">
                                    <button type="button" className="btn btn-primary btn-wave" data-bs-toggle="offcanvas"
                                       data-bs-target="#AddStatusModal" aria-controls="AddStatusModal" onClick={handleShow}><i
                                          className="ri-add-circle-fill me-2 align-middle"></i>Add Status</button>
                                 </div>
                                 <AddEditStatusForm show={show} setShow={setShow} projectsListFromDb={projectsListFromDb} upwokProfileListFromDb={upwokProfileListFromDb}/>
        </>
        
    )
}

export default AddStatusButton;