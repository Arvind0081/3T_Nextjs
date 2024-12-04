'use client';
import React, { useState, useEffect } from 'react';
import { updateLockStatus } from '@/utils/publicApi';
import { LockStatus } from '@/utils/types'; 


interface LockInvoiceProps {
  id: number; 
  initialStatus: boolean; 
  loadInitialInvoices:any;
}

const LockInvoice: React.FC<LockInvoiceProps> = ({ id, initialStatus,loadInitialInvoices }) => {


  const [isLocked, setIsLocked] = useState<any>(); 



  useEffect(() => {
    setIsLocked(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = async () => {
    const newStatus = !isLocked; 

    const updateReq: LockStatus = {
      id: id,
      status: newStatus,
    };

    try {
      console.log('Sending request to update status to:', newStatus); 
     const response= await updateLockStatus(updateReq);
     console.log(response);
  
     if(response){
      setIsLocked(newStatus); 
      loadInitialInvoices();
     }
     
    } catch (error) {
      console.error('Failed to update lock status:', error);
    }
  };

  return (
    <i
      className={`bi ${isLocked ? 'bi-lock ' : 'bi-unlock'}`}
      onClick={handleStatusChange}
      style={{ cursor: 'pointer' }}
    ></i>
  );
};

export default LockInvoice;
