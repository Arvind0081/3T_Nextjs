'use client'
import React,{useState,useEffect} from 'react';
import ModuleHeader from '@/components/projects/projectDetailsModuleHeader';
import EditModule from '@/components/projects/editModuleButton';
import DeleteModuleButton from '@/components/projects/deleteProjectModuleButton';
import ProjectModuleStatusDropdown from '@/components/projects/changeProjectModuleStatusDropdown';
import ProjectPaymentStatusDropdown from '@/components/projects/changeProjectPaymentStatusDropdown';
import Paginator from '@/components/projects/projectModulePagination';
import {ModuleDetailsModel, ProjectModuleFormValue} from '@/utils/types';
import { format } from 'date-fns';
import getUser from '@/utils/getUserClientSide';
import { modulesDetails } from '@/utils/publicApi';

const ModuleDetailsTable=({projectId,projectModuleStatus,projectPaymentsStatus}:any)=>{

    let token:any;
  token = getUser();

  const [moduleDetails,setModuleDetails]=useState<any[]>([]);
  const [totalRecords,setTotalRecords]=useState(0);
  const [moduleFilter,setModuleFilter]=useState<String[]>(['Open']);
  const [paymentFilter,setPaymentFilter]=useState<String[]>(['Pending']);
  const [pageSize,setPageSize]=useState(10);
  const [pageNumber,setPageNumber]=useState(1);
  const [debounceSearchValue,setDebounceSearchValue]=useState('');

    const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
    
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

     

      const payload: ProjectModuleFormValue = {
        id: projectId,
        moduleStatus: moduleFilter,
        paymentStatus: paymentFilter,
        departmentId: Number(token?.departmentId),
        pageSize:Number(pageSize),
        pageNumber:Number(pageNumber),
        searchValue:debounceSearchValue
      };

      const fetchModuleDetails=async()=>{
        try {
     
            const result:any = await modulesDetails(payload);
            if (result) {
              const { results, totalCount } = result;
              setModuleDetails(results);
              setTotalRecords(totalCount);
          } else{
            setModuleDetails([]);
            setTotalRecords(0);
          }
            
           
          } catch (error) {}

      };

      useEffect(()=>{
  
            fetchModuleDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[moduleFilter,paymentFilter,debounceSearchValue,pageNumber]);

     
      const totalModuleEstimatedHours = () => {
        return numberToTimeConversion(
          moduleDetails
            .map((item: ModuleDetailsModel) => item.estimatedHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
    
      const totalModuleBilledHours = () => {
        return numberToTimeConversion(
          moduleDetails
            .map((item: ModuleDetailsModel) => item.billedHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
    
      const totalModuleNonBillableHours = () => {
        return numberToTimeConversion(
          moduleDetails
            .map((item: ModuleDetailsModel) => item.nonBillableHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
    
      const showingRecordCount = () => {
        const Count =
          (pageNumber - 1) * pageSize + Math.ceil(moduleDetails.length) <=
          totalRecords
            ? (pageNumber - 1) * pageSize + Math.ceil(moduleDetails.length)
            : totalRecords;
    
        return Count;
      };

      const showSerialNumber=(index:number)=>{
       return (pageNumber - 1) * pageSize + index + 1;
      };


    return(
        <div className='card custom-card'>
                      <ModuleHeader
                      projectId={projectId}
                        moduleFilter={moduleFilter}
                        setModuleFilter={setModuleFilter}
                        paymentFilter={paymentFilter}
                        setPaymentFilter={setPaymentFilter}
                        debounceSearchValue={debounceSearchValue}
                        setDebounceSearchValue={setDebounceSearchValue}
                        projectModuleStatus={projectModuleStatus}
                        projectPaymentsStatus={projectPaymentsStatus}
                        setPageNumber={setPageNumber}
                      />
                      <div className='card-body Upwork_table employee_table'>
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover border table-bordered'>
                            <thead>
                              <tr>
                                <th
                                  scope='col'
                                  style={{
                                    width: '70px',
                                  }}
                                >
                                  S.No
                                </th>
                                <th scope='col' className='module-width'>
                                  Module Name{' '}
                                </th>
                                <th scope='col'>Approved Hours </th>
                                <th scope='col'>Billed Hours </th>
                                <th scope='col'>Non Billable Hours</th>
                                <th scope='col'>Approved on</th>
                                <th scope='col'>Module Status </th>
                                <th scope='col'>Payment Status</th>
                                <th scope='col'>Action</th>
                              </tr>
                            </thead>
                            {moduleDetails.length > 0 && (
                              <tbody>
                                {moduleDetails.map(
                                  (item: ModuleDetailsModel, index: number) => (
                                    <tr key={item.id}>
                                      <td className='text-center'>
                                        {showSerialNumber(index)}
                                      </td>
                                      <td>{item.name}</td>
                                      <td className='text-success'>
                                        {numberToTimeConversion(
                                          item.estimatedHours
                                        )}
                                      </td>
                                      <td className='text-success text-bold'>
                                        <b>
                                          {numberToTimeConversion(
                                            item.billedHours
                                          )}
                                        </b>
                                      </td>
                                      <td className='text-danger'>
                                        {numberToTimeConversion(
                                          item.nonBillableHours
                                        )}
                                      </td>
                                      <td>
                                        {format(
                                          new Date(item.approvalDate),
                                          'dd-MM-yyyy'
                                        )}
                                      </td>
                                      <td>
                                        <ProjectModuleStatusDropdown
                                          id={item.id}
                                          departmentId={Number(
                                            token?.departmentId
                                          )}
                                          moduleStatusData={projectModuleStatus}
                                          moduleStatus={item.moduleStatus}
                                        />
                                      </td>
                                      <td>
                                        <ProjectPaymentStatusDropdown
                                          id={item.id}
                                          departmentId={Number(
                                            token?.departmentId
                                          )}
                                          paymentStatusData={
                                            projectPaymentsStatus
                                          }
                                          paymentStatus={item.paymentStatus}
                                        />
                                      </td>
                                      <td>
                                        <EditModule
                                          id={item.id}
                                          departmentId={Number(
                                            token?.departmentId
                                          )}
                                          projectId={projectId}
                                          projectModuleStatus={
                                            projectModuleStatus
                                          }
                                          projectPaymentsStatus={
                                            projectPaymentsStatus
                                          }
                                        />
                                        <DeleteModuleButton id={item.id} />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            )}

                            {moduleDetails.length > 0 && (
                              <tfoot>
                                <tr>
                                  <td className='text-bold'>Total </td>
                                  <td></td>
                                  <td className='text-success'>
                                    {totalModuleEstimatedHours()}
                                  </td>
                                  <td className='text-success text-bold'>
                                    <b>{totalModuleBilledHours()}</b>
                                  </td>
                                  <td className='text-danger'>
                                    {totalModuleNonBillableHours()}
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tfoot>
                            )}
                          </table>
                          {moduleDetails.length == 0 && (
                            <span>No record found.</span>
                          )}
                        </div>
                      </div>
                      <div className='card-footer'>
                        {moduleDetails.length > 0 &&<div className='d-flex align-items-center'>
                          <div>
                            {' '}
                            Showing {showingRecordCount()} Entries{' '}
                            <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                          </div>
                          <div className='ms-auto'> <Paginator totalRecords={totalRecords} count={moduleDetails.length} data={payload} pageSize={pageSize} setPageSize={setPageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} /></div>
                        </div>}
                      </div>
                    </div>

    )
}

export default ModuleDetailsTable;