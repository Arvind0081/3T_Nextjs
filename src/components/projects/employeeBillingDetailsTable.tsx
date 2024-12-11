'use client'
import React,{useState,useEffect} from 'react';
import {EmployeeDetailsModel, ProjectEmployeeDetailsModel, ProjectEmployeeStatus} from '@/utils/types';
import { format } from 'date-fns';
import Link from 'next/link';
import getUser from '@/utils/getUserClientSide';
import StatusDateFilter from '@/components/projects/dateFilterProjectStatus';
import { projectEmployeeDetails } from '@/utils/publicApi';

const EmployeeBillingDetailsTable=({projectId}:any)=>{

    let token:any;
    token = getUser();
    const today = new Date();
    const statusStartDate = format(new Date(today.setDate(today.getDate() - 6)), 'yyyy-MM-dd');
    const statusEndDate = format(new Date(), 'yyyy-MM-dd');
    const [startDate,setStartDate]=useState(statusStartDate);
    const [endDate,setEndDate]=useState(statusEndDate);

    const [employeeDetails,setEmployeeDetails]=useState<ProjectEmployeeStatus[]>([]);

    const fetchEmployeeDetails=async ()=>{
        try {

            const payload: ProjectEmployeeDetailsModel = {
                id: projectId,
                statusStartDate: startDate,
                statusEndDate: endDate,
                departmentId: Number(token?.departmentId),
              };
            const response = await projectEmployeeDetails(payload);
            if(response){
                setEmployeeDetails(response);
            }
            else{
                setEmployeeDetails([]);
            }
          } catch (error) {}

    };

    useEffect(()=>{
        fetchEmployeeDetails();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startDate,endDate]);

    const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
    
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

      const entriesCount=()=>{
        let count:any =employeeDetails?.map((item:any)=>item.date);
        count=new Set(count);
        count=[...count];
        return count.length;
    
      }

    return(
        <div className='card custom-card'>
                      <div className='card-header justify-content-between items-center'>
                        <div className='card-title'>Employee Billing Detail</div>
                        <div className='filter-right d-flex gap-x-2'>
                          <StatusDateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                        </div>
                      </div>
                      <div className='card-body Upwork_table employee_table'>
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover border table-bordered employeeStatus_table'>
                            <thead>
                              <tr>
                                <th scope='col'>Date</th>
                                <th scope='col'>Name</th>
                                <th scope='col' className='project-width'>
                                  Project Name
                                </th>
                                <th scope='col'>Client Name</th>
                                <th scope='col' className='module-width'>
                                  Module
                                </th>
                                <th scope='col' className='profile-width'>
                                  Profile
                                </th>
                                <th scope='col' className='memo-width'>
                                  Memo{' '}
                                </th>
                                <th scope='col'>Upwork Hours</th>
                                <th scope='col'>Fixed Billing Hours</th>
                                <th scope='col'>Non Billable Hours</th>
                              </tr>
                            </thead>
                            {employeeDetails && (
                              <tbody>
                                {employeeDetails?.map(
                                  (
                                    item: EmployeeDetailsModel,
                                    index: number,
                                    employeeDetails: EmployeeDetailsModel[]
                                  ) => (
                                    <tr
                                      className={
                                        index == 0
                                          ? 'mainuser'
                                          : employeeDetails[index].date !==
                                              employeeDetails[index - 1].date
                                            ? 'mainuser'
                                            : ''
                                      }
                                      key={index}
                                    >
                                      <td>
                                        {format(
                                          new Date(item.date),
                                          'dd-MM-yyyy'
                                        )}
                                      </td>
                                      <td>
                                        <b><Link  href={token.id==item.applicationUsersId?'/profile':`/employees/${item.applicationUsersId}`}>{item.employeeName}</Link></b>
                                      </td>
                                      <td>{item.projectName}</td>
                                      <td>{item.clientName}</td>
                                      <td>{item.moduleName}</td>
                                      <td>{item.profileName}</td>
                                      <td>{item.memo}</td>
                                      <td>
                                        {numberToTimeConversion(
                                          item.upworkHours
                                        )}
                                      </td>
                                      <td>
                                        {numberToTimeConversion(
                                          item.fixedHours
                                        )}
                                      </td>
                                      <td className='text-danger'>
                                        {numberToTimeConversion(
                                          item.nonBillableHours
                                        )}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            )}
                          </table>
                          {employeeDetails.length==0 && (
                            <span>No record found.</span>
                          )}
                        </div>
                      </div>
                      <div className='card-footer'>
                        {employeeDetails.length>0 && <div className='d-flex align-items-center'>
                          <div>
                            {' '}
                            Showing {entriesCount()} Entry{' '}
                            <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                          </div>
                          <div className='ms-auto'></div>
                        </div>}
                      </div>
                    </div>

    )
}

export default EmployeeBillingDetailsTable;