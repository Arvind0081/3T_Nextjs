'use client';
import React,{useState} from 'react';
import { updatePaymentStatus } from '@/utils/publicApi';
import { UpdatePaymentReq } from '@/utils/types'; // Adjusted type import

const UpdatePaymentStatus = ({ invoice, payment,loadInitialInvoices }: any) => {

 const [status,setStatus]=useState(Number(invoice?.paymentStatus));

  const handleEmployeeStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: any
  ) => {
    
    const value =Number(event.target.value);
   
    const UpdateReq: UpdatePaymentReq = {
      id: id,
      paymentStatus: value,
    };

 const response= await updatePaymentStatus(UpdateReq);
 if(response){
  loadInitialInvoices();
  setStatus(value);
 }
 else{
  setStatus(Number(invoice?.paymentStatus));
 }
 //router.refresh();
  };

  return (
    <select
      className='form-control w150'
      value={status}
      onChange={(e) => handleEmployeeStatusChange(e, invoice?.id)}
    >
      {payment.map((option: any, index: number) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default UpdatePaymentStatus;
