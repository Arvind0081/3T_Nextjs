'use client';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import ProjectModuleStatusDropdown from './changeModuleStatus';
import ProjectPaymentStatusDropdown from './changePaymentStatus';
import { ModuleStatusModel } from '@/utils/types';
import { format } from 'date-fns';
type Props = {
    show: any;
    setShow: any;
    empID: string;
    projectList: any;
    projectPaymentsStatus: any;
    projectModuleStatus: any;
    paymentsStatus:any;
    setPaymentsStatus:any;
    moduleStatus:any;
    setModuleStatus:any;
    handleRefreshData:any;
};

const ModuleList = ({
    show,
    setShow,
    projectList,
    projectPaymentsStatus,
    projectModuleStatus,paymentsStatus,setPaymentsStatus,moduleStatus,setModuleStatus,handleRefreshData
}: Props) => {
  
    const handleClose = () => {
        setShow(false);
         setPaymentsStatus('Pending');
         setModuleStatus('Open');
    };

    const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);

        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
    };

    const handleChangePaymentsStatus=(e: { target: { value: any; }; })=>{
      const value=e.target.value;
      setPaymentsStatus(value);
  };

  const handleChangeModuleStatus=(e: { target: { value: any; }; })=>{
    const value=e.target.value;
    setModuleStatus(value);
   
};

const totalApprovedHours=()=>{
    return numberToTimeConversion(
        projectList?.map((item: any) => item.approvedHours)
          .reduce((a: number, b: number) => a + b, 0)
      );
  };

  const totalBilledHours=()=>{
    return numberToTimeConversion(
        projectList?.map((item: any) =>(item.upworkHours + item.fixedHours))
          .reduce((a: number, b: number) => a + b, 0)
      );
  };

  const totalNonBilledHours=()=>{
    return numberToTimeConversion(
        projectList?.map((item: any) =>item.nonBillableHours)
          .reduce((a: number, b: number) => a + b, 0)
      );
  };


    return (
        <>
            <Modal
                show={show}
                backdrop='static'
                onHide={handleClose}
                className='custom-modal-width'
            >
                <Modal.Header>
                    <Modal.Title>Module Detail</Modal.Title>
                    <Button
                        variant='close'
                        onClick={handleClose}
                        aria-label='Close'
                        className='ms-auto'
                    >
                        <span aria-hidden='true'>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body text-center p-4 pb-5'>
                        <div className='d-flex justify-content-end items-center mb-3'>
                            <div className='filter-right d-flex gap-x-2'>
                                <div className='align-items-end d-flex gap-x-2'>
                                    <p className='fw-semibold mb-2 nowrap'>
                                        Module Status
                                    </p>
                                    <select
                                                                                className='form-control open_selectBox'
                                                                                value={moduleStatus}
                                                                                onChange={handleChangeModuleStatus}
                                                                            >
                                                                                <option value={''}>{'All'}</option>
                                                                                {projectModuleStatus.map(
                                                                                        (item:ModuleStatusModel) => (
                                                                                            <option key={item.value}
                                                                                                value={item.value}
                                                                                            >
                                                                                                {
                                                                                                    item.text
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                            </select>
                                </div>
                                <div className='align-items-end d-flex gap-x-2'>
                                    <p className='fw-semibold mb-2 nowrap'>
                                        Payment Status
                                    </p>
                                    <select
                                                                                className='form-control open_selectBox'
                                                                                value={paymentsStatus}
                                                                                onChange={handleChangePaymentsStatus}
                                                                            >
                                                                               <option value={''}>{'All'}</option>
                                                                                {projectPaymentsStatus.map(
                                                                                        (item:ModuleStatusModel) => (
                                                                                            <option key={item.value}
                                                                                                value={item.value}
                                                                                            >
                                                                                                {
                                                                                                    item.text
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                            </select>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive theme_table theme_table_left'>
                           
                                <table className='table text-nowrap table-hover border table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Module Name</th>
                                            <th>Approved Hours</th>
                                            <th>Billed Hours</th>
                                            <th>Non Billable Hours</th>
                                            <th>Approved on</th>
                                            <th>Module Status</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectList?.length > 0 && projectList?.map(
                                            (item: any, index: any) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.moduleName}</td>
                                                    <td className="text-success">
                                                        {numberToTimeConversion(
                                                            item.approvedHours
                                                        )}
                                                    </td>
                                                    <td className="text-success text-bold">
                                                        {numberToTimeConversion(
                                                            item.billingHours
                                                        )}
                                                    </td>
                                                    <td className="text-danger">
                                                        {numberToTimeConversion(
                                                            item.nonBillableHours
                                                        )}
                                                    </td>
                                                    <td>
                                                        {
                                                           format(item.approvalDate, 'dd-MM-yyyy') 
                                                        }
                                                    </td>
                                                    <td>
                                                        <ProjectModuleStatusDropdown
                                                            id={item.moduleId}
                                                            moduleStatusData={
                                                                projectModuleStatus
                                                            }
                                                            moduleStatus={
                                                                item.moduleStatus
                                                            }
                                                            handleRefreshData={handleRefreshData}
                                                        />
                                                    </td>
                                                    <td>
                                                        <ProjectPaymentStatusDropdown
                                                            id={item.moduleId}
                                                            paymentStatusData={
                                                                projectPaymentsStatus
                                                            }
                                                            paymentStatus={
                                                                item.paymentStatus
                                                            }
                                                            handleRefreshData={handleRefreshData}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                     {projectList?.length > 0 && <tfoot>
                                     <tr>
                                        <td className="text-bold">Total </td>
                                        <td></td>
                                        <td>{totalApprovedHours()}</td>
                                        <td>{totalBilledHours()}</td>
                                        {/* <td className="text-success text-bold"><b>{}</b></td> */}
                                        <td className="text-danger text-bold">{totalNonBilledHours()}</td>
                                        
                                     </tr>
                                  </tfoot>}
                             
                               
                        
                                </table>
                               {!projectList && <p>No record found</p>} 
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ModuleList;
