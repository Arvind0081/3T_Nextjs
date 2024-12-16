'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BillingTypeModel, HiringModel } from '@/utils/types';


const BillingAndHiringStatusFilter = ({data,hiringTypeFilter,billingTypeFilter}: any) => {

  const [hiringStatus, setHiringStatus] = useState(data.hiringStatus);
  const [billingStatus, setBillingStatus] = useState(data.bilingType);
  const router = useRouter();
  const url = usePathname();


  const handleChangeHiringStatus = (e: { target: { value: any } }) => {
    const hiringValue = e.target.value;
    setHiringStatus(hiringValue);
    router.push( `${url}/?page=${1}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${hiringValue}&bilingType=${billingStatus}&departmentId=${data.departmentId}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`);
router.refresh();  
};

  const handleChangeBillingStatus = (e: { target: { value: any } }) => {
    const billingValue = e.target.value;
    setBillingStatus(billingValue);
    router.push(`${url}/?page=${1}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${hiringStatus}&bilingType=${billingValue}&departmentId=${data.departmentId}&teamAdminId=${data.teamAdminId}&sortColumn=${data.sortColumn}&sortOrder=${data.sortOrder}`);
router.refresh();  
  
};

  return (
    <>
        <div className='selectbox'>
        <p className='fw-semibold'>Billing Type</p>
        <select value={billingStatus}
        onChange={handleChangeBillingStatus} className="form-control">

              {billingTypeFilter?.map((item: BillingTypeModel) => (
                <option key={item.value} value={item.value}>
                  {' '}
                  {item.text}
                </option>
              ))}
                                                </select>
      </div>
      <div className='selectbox'>
        <p className='fw-semibold'>Hiring Platform</p>
       
        <select value={hiringStatus}
        onChange={handleChangeHiringStatus} className="form-control">
              {hiringTypeFilter?.map((item: HiringModel) => (
                <option key={item.value} value={item.value}>
                  {' '}
                  {item.text}
                </option>
              ))}
                                                </select>
     
      </div>
    </>
  );
};

export default BillingAndHiringStatusFilter;