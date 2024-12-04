'use client'
import React, { useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';

const EmployeeStatusDateFilter=({payLoad}:any)=>{

    const [startDate,setStartDate]=useState(payLoad.fromDate);
    const [endDate,setEndDate]=useState(payLoad.toDate);
    const router=useRouter();
    const url=usePathname();

    const handleStartDate=(e: { target: { value: any; }; })=>{
        const startDateValue=e.target.value;
        setStartDate(startDateValue);

        router.push(`${url}/?page=${payLoad.pageNumber>1?payLoad.pageNumber-1:1}&size=${payLoad.pageSize}&startDate=${startDateValue}&endDate=${endDate}`);

    };

    const handleEndDate=(e: { target: { value: any; }; })=>{
        const endDateValue=e.target.value;
        setEndDate(endDateValue);
        router.push(`${url}/?page=${payLoad.pageNumber>1?payLoad.pageNumber-1:1}&size=${payLoad.pageSize}&startDate=${startDate}&endDate=${endDateValue}`);
       
    };


    return(
        <>
       
                                       <div className="align-items-end d-flex gap-x-2 selectbox">
                                          <p className="fw-semibold mb-2">From</p>
                                          <div className="input-group date-selectbox">
                                          <input
                    type='date'
                    className='form-control'
                    value={startDate}
                   onChange={handleStartDate}
                />
                                          </div>
                                       </div>
                                       <div className="align-items-end d-flex gap-x-2 selectbox">
                                          <p className="fw-semibold mb-2">To</p>
                                          <div className="input-group date-selectbox">
                                          <input 
                 type='date'
                 className='form-control'
                 value={endDate}
                onChange={handleEndDate}
             />
                                          </div>
                                       </div>
      
        </>
        
    )
}

export default EmployeeStatusDateFilter;