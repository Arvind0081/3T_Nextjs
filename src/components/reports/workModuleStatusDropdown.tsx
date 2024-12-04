'use client';
import apiService from '@/services/apiService';
import { individualProjectModule } from '@/utils/publicApi';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const WorkModuleStatusDropdown = ({
    departmentId,
    projectModuleStatus,
    selectedStatus,
    moduleId,
}: any) => {
    const [status, setStatus] = useState(selectedStatus);
    const [selectedModuleId, setSelectedModuleId] = useState<string>('');
    const router = useRouter();

    const handleChangeStatus = (e: { target: { value: any } }) => {
        const value = e.target.value;
        setStatus(value);
        setSelectedModuleId(moduleId);
    };

    useEffect(() => {
        if (selectedModuleId) {
            individualProjectDetail();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedModuleId]);

    const individualProjectDetail = async () => {
        const response = await individualProjectModule(
            selectedModuleId,
            departmentId
        );

        const payLoad = { ...response, moduleStatus: status };
        try {
            await apiService.put('/ProjectModule/UpdateProjectModule', payLoad);
            setSelectedModuleId('');
        } catch (error) {
            handleClose();
        }

        router.refresh();
    };

    const handleClose = () => {
         setStatus(selectedStatus);
        setSelectedModuleId('');
    };
    return (
        <>
            <select
                className="form-control"
                value={status}
                onChange={handleChangeStatus}
            >
                {projectModuleStatus?.map((item: any) => (
                    <option key={item.value} value={item.text}>
                        {item.text}
                    </option>
                ))}
            </select>
        </>
    );
};

export default WorkModuleStatusDropdown;
