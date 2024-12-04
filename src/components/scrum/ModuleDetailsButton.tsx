'use client'
import apiService from '@/services/apiService';
import React,{useState,useEffect} from 'react';
import ModuleList from './moduleDetailsList';
import { projectModulesStatus, projectPaymentStatus } from '@/utils/publicApi';


const ModuleDetailsButton=({id,payLoad}:any)=>{

    const [show, setShow] = useState(false);
    const [projectList,setprojectList]= useState();
  const [projectPaymentsStatus,setProjectPaymentsStatus]=useState<any[]>([]);
  const [projectModuleStatus,setProjectModuleStatus]=useState<any[]>([]);
  const [paymentsStatus,setPaymentsStatus]=useState<any>('Pending');
  const [moduleStatus,setModuleStatus]=useState<any>('Open');

  useEffect(()=>{
    handleRefreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[paymentsStatus,moduleStatus]);

  const handleRefreshData=async()=>{
    try {
      const response = await apiService.get(`/TeamLeadDashboard/GetProjectModuleBillingDetailsByProjectID?ProjectId=${id}&PaymentStatus=${paymentsStatus}&ModuleStatus=${moduleStatus}&FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}`);
    setprojectList(response?.model);
    } catch (error) {}
  };

    const handleShow = async () => {
  
  try {
    const response = await apiService.get(`/TeamLeadDashboard/GetProjectModuleBillingDetailsByProjectID?ProjectId=${id}&PaymentStatus=${paymentsStatus}&ModuleStatus=${moduleStatus}&FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}`);
    setprojectList(response?.model);
   
     const paymentStatusResponse = await projectPaymentStatus();
     setProjectPaymentsStatus(paymentStatusResponse);

     const moduleStatusResponse = await projectModulesStatus();
     setProjectModuleStatus(moduleStatusResponse);
    setShow(true);
  } catch (error) {}
};
  

    return(
        <>
        <div className="align-items-start d-flex fs-15 gap-2"><button  onClick={handleShow} aria-label="anchor"  className="btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text" data-bs-target="#ModuleDetails"  data-bs-toggle="modal">View</button></div>
        {show && <ModuleList empID={id} show={show} setShow={setShow} projectList={projectList} projectPaymentsStatus={projectPaymentsStatus} projectModuleStatus={projectModuleStatus} paymentsStatus={paymentsStatus} setPaymentsStatus={setPaymentsStatus} moduleStatus={moduleStatus} setModuleStatus={setModuleStatus} handleRefreshData={handleRefreshData}/>}                                       
        </>
    )
}

export default ModuleDetailsButton;