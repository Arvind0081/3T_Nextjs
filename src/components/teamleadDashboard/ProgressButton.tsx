// components/commonComponents/Delete
'use client';
import React, { useState } from 'react';
import ProgressReport from './progressReport';
import apiService from '@/services/apiService';
import { format } from 'date-fns';

type Props = {
  empID: string;
};

const ProgressButton = ({ empID }:Props) => {
  const [show, setShow] = useState(false);
  const [progressList,setProgressList]= useState();;

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
  const response = await apiService.get(`/TeamLeadDashboard/GetEmployeeProjectBillingDetailsByModule?EmployeeId=${empID}&FromDate=${formattedFirstDate}&ToDate=${formattedLastDate}`);
  setProgressList(response?.model)
  return response?.model;

};
if (empID) {
  performanceList();
}


   
  }
  return (
    <>
      {show && <ProgressReport empID={empID} show={show} setShow={setShow} ProgressDetail={progressList} />}
      <button onClick={showModal}>View</button>
    </>
  );
};

export default ProgressButton;
