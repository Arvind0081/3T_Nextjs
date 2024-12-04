'use client'
import apiService from '@/services/apiService';
import React,{useState} from 'react';
import EmployeeProgressDetails from './employeeProgressDetails';

const EmployeeProgressDetailsButton=({id,payLoad,name}:any)=>{

    const [show, setShow] = useState(false);
    const [progressList,setProgressList]= useState();;
  
    const handleShow = async () => {
  try {

    const response = await apiService.get(`/TeamLeadDashboard/GetEmployeeProjectBillingDetailsByModule?EmployeeId=${id}&FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}`);
   
    setProgressList(response?.model);
    setShow(true);
  } catch (error) {}
  
}
 
  

    return(
        <>
        <button aria-label="anchor"  onClick={handleShow} className="btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text">View</button>
        {show && <EmployeeProgressDetails  show={show} setShow={setShow} ProgressDetail={progressList} name={name}/>}
        </>
    )
}

export default EmployeeProgressDetailsButton;