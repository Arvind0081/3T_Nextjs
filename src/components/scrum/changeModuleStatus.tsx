'use client'
import apiService from '@/services/apiService';
import { ModuleStatusModel} from '@/utils/types';
import React, { useState } from 'react';

const ProjectModuleStatusDropdown=({id,moduleStatusData,moduleStatus,handleRefreshData}:any)=>{

    const [status,setStatus]=useState(moduleStatus);

    const handleChangeStatus=async(e: { target: { value: any; }; })=>{
        const value=e.target.value;
            
        const payLoad={
            moduleId:id,
            ModuleStatus:value,
        }
         try {
            await apiService.put(`/ProjectModule/UpdateProjectModulePaymentAndModuleStatus?moduleId=${payLoad.moduleId}&PaymentStatus=''&ModuleStatus=${payLoad.ModuleStatus}`, payLoad);
            setStatus(value);
            handleRefreshData();
         } catch (error) {
            handleClose();
         }

    };

    const handleClose=()=>{
        setStatus(moduleStatus);
    };
    return (
        <select
                                                                                className='form-control form-select select2'
                                                                                value={status}
                                                                                onChange={handleChangeStatus}
                                                                            >
                                                                                {moduleStatusData.map(
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

export default ProjectModuleStatusDropdown;