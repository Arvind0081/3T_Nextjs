'use client'
import { approveMemberByManager } from '@/utils/publicApi';
import { ApproveMemberModel } from '@/utils/types';
import React from 'react';
import {useRouter} from 'next/navigation';

const ActionButtons=({id}:any)=>{
 const router=useRouter();

    const handleApprove=async()=>{
try {
    const payload:ApproveMemberModel={
        employeeId:id,
        teamAdminId:'',
        isActive:1
    }
    await approveMemberByManager(payload);
    router.refresh();
} catch (error) {}
    }

    const handleReject=async()=>{
        try {
            const payload:ApproveMemberModel={
                employeeId:id,
                teamAdminId:'',
                isActive:0
            }
            await approveMemberByManager(payload);
            router.refresh();
        } catch (error) {}
            }

    return(
        <div className="action_btns">
        <i onClick={handleApprove} className="btn btn-primary btn-sm btn-wave waves-effect waves-light">Accept</i>&nbsp;&nbsp;
        <i onClick={handleReject} className="btn btn-danger btn-sm btn-wave waves-effect waves-light">Reject</i>
    </div> 
    )
}

export default ActionButtons;