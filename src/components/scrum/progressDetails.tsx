'use client'
import React,{useState} from 'react';
import ProgressReport from './progressReport';
import apiService from '@/services/apiService';
const ProgressDetails=({id,payLoad}:any)=>{
const [show,setShow]=useState(false);
const [progressList,setProgressList]=useState([]);

    const handleModel=async()=>{


        try {
            const response = await apiService.get(`/TeamLeadDashboard/GetDeveloperProgressReport?ProjectId=${id}&TeamLeadId=${payLoad.teamLeadId}&FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}`);
            setProgressList(response?.model);
            setShow(true);
          } catch (error) {}
    }

    return(
        <>
        <div className="align-items-start d-flex fs-15 gap-2"><button onClick={handleModel} aria-label="anchor" className="btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text" data-bs-target="#ProgressReport"  data-bs-toggle="modal">View</button></div>
    
        {show && <ProgressReport show={show} setShow={setShow} ProgressDetail={progressList} />}
        </>
                                                  
    )
}

export default ProgressDetails;