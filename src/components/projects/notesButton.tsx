'use client'
import React,{useState} from 'react';
import ProjectNotesForm from './projectNotesForm';
import { individualProject } from '@/utils/publicApi';
import { ProjectInfoModel } from '@/utils/types';

const NotesButton=({id,paginationData}:any)=>{
const [showNotes,setShowNotes]=useState(false);
const [selectedProject,setSelectedProject]=useState<ProjectInfoModel>();

const handleClick=async()=>{
    const response =await individualProject(id);
  
    if(response){
        setSelectedProject(response);
        setShowNotes(true);
    }

}

    return(
        <>
 <span
        onClick={handleClick}
        className='btn-link'
    >
        {
            'Notes'
        }
    </span>
   <ProjectNotesForm showNotes={showNotes} setShowNotes={setShowNotes} 
  selectedProject={selectedProject} setSelectedProject={setSelectedProject} paginationData={paginationData}
  />
        </>
       
    )
}

export default NotesButton;