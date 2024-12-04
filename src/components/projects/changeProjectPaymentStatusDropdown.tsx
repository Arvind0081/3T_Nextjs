'use client'
import apiService from '@/services/apiService';
import { individualProjectModule } from '@/utils/publicApi';
import { ModuleStatusModel} from '@/utils/types';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';

const ProjectPaymentStatusDropdown=({id,departmentId,paymentStatusData,paymentStatus}:any)=>{

    const [status,setStatus]=useState(paymentStatus);
const [selectedModuleId,setSelectedModuleId]=useState<string>('');
const router=useRouter();
  
    const handleChangeStatus=(e: { target: { value: any; }; })=>{
        const value=e.target.value;
        setStatus(value);
        setSelectedModuleId(id);
    };

    useEffect(()=>{
        if (selectedModuleId) {
            individualProjectDetail();
         }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedModuleId]);

    const individualProjectDetail=async()=>{
     
        const response =await individualProjectModule(selectedModuleId,departmentId);
     
        const payLoad={...response,
            paymentStatus:status
        }
         try {
            await apiService.put('/ProjectModule/UpdateProjectModule', payLoad);
          router.refresh();
           setSelectedModuleId('');
         } catch (error) {
            handleClose();
         }
    };

    const handleClose=()=>{
        setStatus(paymentStatus);
        setSelectedModuleId('');
    };
    return (
        <select
                                                                                className='form-control form-select select2'
                                                                                value={status}
                                                                                onChange={handleChangeStatus}
                                                                            >
                                                                                {paymentStatusData.map(
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
    )
}

export default ProjectPaymentStatusDropdown;