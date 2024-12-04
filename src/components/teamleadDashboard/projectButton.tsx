// components/commonComponents/Delete
'use client';
import React, { useState } from 'react';
import apiService from '@/services/apiService';
import ProjectList from './projectList';
import { format } from 'date-fns';
type Props = {
    projectID: string;
};

const ProjectButton = ({ projectID }:Props) => {
  const [show, setShow] = useState(false);
  const [projectList,setprojectList]= useState();;

  const showModal = async () => {
    setShow(true);

    let dateStr = new URLSearchParams(window.location.search).get('month');
    if (!dateStr) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      dateStr = `${year}-${month}`;
    }


    const [yearStr, monthStr] = dateStr.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    const formattedFirstDate = format(firstDate, 'yyyy-MM-dd');
    const formattedLastDate = format(lastDate, 'yyyy-MM-dd');
 
    
const performanceList = async()=>{
  const response = await apiService.get(`/TeamLeadDashboard/GetProjectModuleBillingDetailsByProjectID?ProjectId=${projectID}&FromDate=${formattedFirstDate}&ToDate=${formattedLastDate}`);
  setprojectList(response?.model)
  return response?.model;

};
if (projectID) {
  performanceList();
}


   
  }
  return (
    <>
      {show && <ProjectList empID={projectID} show={show} setShow={setShow} projectList={projectList} />}
      <button onClick={showModal}>View</button>
    </>
  );
};

export default ProjectButton;
