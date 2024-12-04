// components/commonComponents/Delete
'use client';
import React, { useState } from 'react';
import ReportDetails from './reportView';
import { ProjectBillingReport } from '@/utils/types';
import { projectBillingReport } from '@/utils/publicApi';
import { useSearchParams } from 'next/navigation';

const ReportDetailsButton = ({ employeeId }: any) => {
    //Initialize hook
    const searchParams = useSearchParams();

    //Get Params
    const hoursFrom = searchParams?.get('hoursFrom');
    const hoursTo = searchParams?.get('hoursTo');

    //Declare State
    const [show, setShow] = useState(false);
    const [projectReport, setProjectReport] = useState();

    const showModal = async () => {
        if (employeeId) {
            const reqProjectBillingReport: ProjectBillingReport = {
                From: hoursFrom ?? '',
                To: hoursTo ?? '',
                EmployeeId: employeeId,
            };
            const projectReports = await projectBillingReport(
                reqProjectBillingReport
            );
            setProjectReport(projectReports);
            setShow(true);
        }
    };
    return (
        <>
            {show && (
                <ReportDetails
                    show={show}
                    setShow={setShow}
                    projectReport={projectReport}
                />
            )}
            <button
                aria-label="anchor"
                className="btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text"
                data-bs-target="#ProgressReport"
                data-bs-toggle="modal"
                onClick={showModal}
            >
                Work detail
            </button>
        </>
    );
};

export default ReportDetailsButton;
