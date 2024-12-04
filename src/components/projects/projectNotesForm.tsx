'use client'
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

const ProjectNotesForm=({showNotes,setShowNotes,selectedProject,setSelectedProject}:any)=>{

const router=useRouter();
const [notes,setNotes]=useState('');


useEffect(() => {
    if (selectedProject) {
       setNotes(selectedProject.notes);
     } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedProject]);



const handleChange=(e: { target: { value: any; }; })=>{
    setNotes(e.target.value);
};

const handleClose=()=>{
    setShowNotes(false);
    setNotes('');
    setSelectedProject(null);
};

const handleUpdate=async ()=>{
     
    const payLoad={...selectedProject,
        notes:notes
    }
        await apiService.put('/Project/UpdateProject', payLoad);
        router.refresh();
        handleClose();
        
};
    return(
    <Offcanvas show={showNotes} onHide={handleClose} placement='end'>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>{'Project Notes'}</Offcanvas.Title>
      <Button
                                        type='button'
                                        className='btn-close text-reset text-right'
                                        onClick={handleClose}
                                    >
                                        <i className='fe fe-x fs-18'></i>
                                    </Button>
    </Offcanvas.Header>
    <Offcanvas.Body>
   
    <div className='offcanvas-body'>
                                         <div className='row'>
                                             <div className='col-md-12 form-group'>
                                                 <textarea
                                                     id='inputState'
                                                     className='form-control'
                                                     style={{ height: '500px' }}
                                                   onChange={handleChange}
                                                   value={notes}
                                                 ></textarea>
                                             </div>
                                         </div>
                                     </div>
                                    <div className='offcanvas-footer text-right'>
                                         <Button
                                             variant="danger"
                                             className='btn btn-danger'
                                             onClick={handleClose}
                                         >
                                             Cancel
                                         </Button>
                                         <Button
                                             variant="secondary" 
                                             className='btn btn-primary'
                                             onClick={handleUpdate}
                                         >
                                             Update
                                         </Button>
                                     </div>                          
                               
                                
    </Offcanvas.Body>
  </Offcanvas>
       
    )
}

export default ProjectNotesForm;