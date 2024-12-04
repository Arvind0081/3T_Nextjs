'use client';
import React, { useEffect, useState } from 'react';
import apiService from '@/services/apiService';
import { individualProjectModule } from '@/utils/publicApi';

const PaymentStatusDropdown = ({
    departmentId,
    projectPaymentsStatus,
    selectedStatus,
    moduleId,
}: any) => {
    const [status, setStatus] = useState(selectedStatus);
    const [selectedModuleId, setSelectedModuleId] = useState<string>('');
    useEffect(() => {
        if (selectedModuleId) {
            individualProjectDetail();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedModuleId]);

    const handleChangeStatus = (e: { target: { value: any } }) => {
  
        const value = e.target.value;
        setStatus(value);
        setSelectedModuleId(moduleId);
    };
    if (!departmentId) {
        return <div>Loading...</div>;
    }

    const individualProjectDetail = async () => {
        const response = await individualProjectModule(
            selectedModuleId,
            departmentId
        );

        const payLoad = { ...response, paymentStatus: status };
        try {
            await apiService.put('/ProjectModule/UpdateProjectModule', payLoad);
            // router.refresh();
            setSelectedModuleId('');
        } catch (error) {
            handleClose();
        }
    };

    const handleClose = () => {
        // setStatus(selectedStatus);
        setSelectedModuleId('');
    };
    return (
        <select
            className="form-control form-select select2"
            value={status}
            onChange={handleChangeStatus}
        >
            {projectPaymentsStatus.map((item: any) => (
                <option key={item.value} value={item.value}>
                    {item.text}
                </option>
            ))}
        </select>
    );
};

export default PaymentStatusDropdown;
