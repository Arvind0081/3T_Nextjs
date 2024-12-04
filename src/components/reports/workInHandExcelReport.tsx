'use client';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx';
import { developersReport } from '@/utils/publicApi';
import { useSearchParams } from 'next/navigation';
import { DevelopersReport } from '@/utils/types';

const DeveloperExcelReport = () => {
    //Initialize hook
    const searchParams = useSearchParams();

    // Get Params
    const hoursFrom: any = searchParams?.get('hoursFrom');
    const hoursTo: any = searchParams?.get('hoursTo');

    let developersReports: any;
    const handleExportToExcel = async ({}) => {
        try {
            const developersReportReq: DevelopersReport = {
                From: hoursFrom ?? '',
                To: hoursTo ?? '',
                PageNumber: 0,
                PageSize: 0,
                DepartmentId: 0,
                SearchValue: '',
                TeamAdminId: ''
            };
            try {
                developersReports = await developersReport(developersReportReq);
        
            } catch (error) {}
            // Check for successful response
            if (developersReports.results != null) {
                const worksheet = XLSX.utils.json_to_sheet(
                    developersReports.results
                );
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'DataSheet.xlsx');

                // Display success message
                toastr.success('File downloaded successfully', '', {
                    timeOut: 1000,
                });
            } else {
                toastr.error('Failed to download file', '', { timeOut: 1000 });
            }
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toastr.error('An error occurred while exporting to Excel', '', {
                timeOut: 1000,
            });
        }
    };

    return (
        <button
            className="btn"
            style={{ backgroundColor: '#7952b3', color: 'white' }}
            onClick={handleExportToExcel}
        >
            <i className="bi bi-file-excel-fill"></i> Export to Excel
        </button>
    );
};

export default DeveloperExcelReport;