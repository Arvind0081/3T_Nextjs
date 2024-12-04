'use client'
import apiService from '@/services/apiService';
import { ModuleStatusModel} from '@/utils/types';
import React, { useState } from 'react';

const ProjectPaymentStatusDropdown=({id,paymentStatusData,paymentStatus,handleRefreshData}:any)=>{

    const [status,setStatus]=useState(paymentStatus);

    const handleChangeStatus=async(e: { target: { value: any; }; })=>{
        const value=e.target.value;

        const payLoad={
            moduleId:id,
            PaymentStatus:value,
        }
       
         try {
            await apiService.put(`/ProjectModule/UpdateProjectModulePaymentAndModuleStatus?moduleId=${payLoad.moduleId}&PaymentStatus=${payLoad.PaymentStatus}&ModuleStatus=''`, payLoad);
            setStatus(value);
            handleRefreshData();
         } catch (error) {
            handleClose();
         }
    };

    const handleClose=()=>{
        setStatus(paymentStatus);
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