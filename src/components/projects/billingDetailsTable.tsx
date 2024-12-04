'use client'
import React,{useState,useEffect} from 'react';
import BillingDateFilter from '@/components/projects/dateFilterProjectBilling';
import {BillingDetailsModel, ProjectBillingDetailsModel, ProjectBillingModel} from '@/utils/types';
import Link from 'next/link';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { projectBillingDetails } from '@/utils/publicApi';
import { format } from 'date-fns';
import getUser from '@/utils/getUserClientSide';

const BillingDetailsTable=({projectId}:any)=>{

    let token:any;
  token = getUser();

    const today = new Date();
    const billingStartDate = format(new Date(today.setDate(today.getDate() - 6)), 'yyyy-MM-dd');
    const billingEndDate = format(new Date(), 'yyyy-MM-dd');
    const [startDate,setStartDate]=useState(billingStartDate);
    const [endDate,setEndDate]=useState(billingEndDate);

    const [billingDetails,setBillingDetails]=useState<ProjectBillingModel[]>([]);

    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' |string}>({ key: '', direction: '' });

    const fetchBillingDetails=async ()=>{
        try {

            const payload: ProjectBillingDetailsModel = {
                id: projectId,
                billingStartDate: startDate,
                billingEndDate: endDate,
                departmentId: Number(token?.departmentId),
              };
            

            const response = await projectBillingDetails(payload);
            if(response){
                setBillingDetails(response);
            }
            else{
                setBillingDetails([]);
            }
          } catch (error) {}
    };

    useEffect(()=>{
        fetchBillingDetails();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startDate,endDate]);

    useEffect(()=>{
        sortedData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[billingDetails]);

  

    const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
    
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

      const totalBilledUpworkHours = () => {
        return numberToTimeConversion(
          billingDetails
            .map((item: BillingDetailsModel) => item.upworkHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
      const totalBilledFixedHours = () => {
        return numberToTimeConversion(
          billingDetails
            .map((item: BillingDetailsModel) => item.fixedHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
      const totalOfTotalBilledHours = () => {
        return numberToTimeConversion(
          billingDetails
            .map((item: BillingDetailsModel) => item.totalBilledHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };
      const totalOfNonBillableHours = () => {
        return numberToTimeConversion(
          billingDetails
            .map((item: BillingDetailsModel) => item.nonBillableHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
      };

        // Sorting logic
     const sortedData = () => {
    
        if(billingDetails){
              // Directly copying the teamDetails array
        const sortedData:ProjectBillingModel[] = [...billingDetails];
      
        const { key, direction } = sortConfig;
      
        if (key) {
          sortedData.sort((a:any, b:any) => {
            const aValue = a[key];
            const bValue = b[key];
      
            // Handling cases where the key might not exist in an object
            if (aValue === undefined || bValue === undefined) return 0;
      
            // Sorting numeric values
            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
      
            // Sorting string values
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
      
            // Optional: Handle mixed types or fallback (if necessary)
            return 0; // Default case if types don't match
          });
        }
      
        return sortedData;

        }
      
      };
      

      const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
      };

    return(
        <div className='card custom-card'>
                      <div className='card-header justify-content-between items-center'>
                        <div className='card-title'>Billing Details</div>
                        <div className='filter-right d-flex gap-x-2'>
                          <BillingDateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                        </div>
                      </div>
                      <div className='card-body Upwork_table employee_table'>
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover border table-bordered'>
                            <thead>
                              <tr>
                                <th scope='col' onClick={() => requestSort('developerName')}>Developer Name {sortConfig.key !== 'developerName'?<FaSort /> :(sortConfig.key === 'developerName' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                                <th scope='col' onClick={() => requestSort('projectModuleName')}>Module Name {sortConfig.key !== 'projectModuleName'?<FaSort /> :(sortConfig.key === 'projectModuleName' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  } </th>
                                <th scope='col' onClick={() => requestSort('upworkHours')}>Upwork Hours {sortConfig.key !== 'upworkHours'?<FaSort /> :(sortConfig.key === 'upworkHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                                <th scope='col' onClick={() => requestSort('fixedHours')}>Fixed Billing Hours {sortConfig.key !== 'fixedHours'?<FaSort /> :(sortConfig.key === 'fixedHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                                <th scope='col' onClick={() => requestSort('totalBilledHours')}>Total Billed Hours {sortConfig.key !== 'totalBilledHours'?<FaSort /> :(sortConfig.key === 'totalBilledHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                                <th scope='col' onClick={() => requestSort('nonBillableHours')}>Non Billable Hours {sortConfig.key !== 'nonBillableHours'?<FaSort /> :(sortConfig.key === 'nonBillableHours' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }</th>
                              </tr>
                            </thead>
                            {sortedData() && (
                              <tbody>
                                {sortedData()?.map(
                                  (
                                    item: BillingDetailsModel,
                                    index: number
                                  ) => (
                                    <tr key={index}>
                                      <td><Link href='#'
                                      // href={user.id==employee.employeeId?'/profile':`/employees/${employee.employeeId}`}
                                       >{item.developerName}</Link></td>
                                      <td>{item.projectModuleName}</td>
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
                                      <td className='text-success text-bold'>
                                        <b>
                                          {numberToTimeConversion(
                                            item.totalBilledHours
                                          )}
                                        </b>
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

                            <tfoot>
                              {billingDetails.length>0 && (
                                <tr>
                                  <td className='text-bold'>Total </td>
                                  <td></td>
                                  <td>{totalBilledUpworkHours()}</td>
                                  <td>{totalBilledFixedHours()}</td>
                                  <td className='text-success text-bold'>
                                    <b>{totalOfTotalBilledHours()}</b>
                                  </td>
                                  <td className='text-danger'>
                                    {totalOfNonBillableHours()}
                                  </td>
                                </tr>
                              )}
                            </tfoot>
                          </table>
                          {!billingDetails && (
                            <span>No record found.</span>
                          )}
                        </div>
                      </div>
                      <div className='card-footer'>
                        {billingDetails && <div className='d-flex align-items-center'>
                          <div>
                            {' '}
                            Showing {billingDetails?.length} Entries{' '}
                            <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                          </div>
                          <div className='ms-auto'></div>
                        </div>}
                      </div>
                    </div>

    )
}

export default BillingDetailsTable;