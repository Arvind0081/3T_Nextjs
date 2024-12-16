'use client';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx';
import { projectsReport } from '@/utils/publicApi';
// import { useSearchParams } from 'next/navigation';
import { ProjectsReport } from '@/utils/types';


const ProjectExcelReport = ({param}:any) => {
    //Initialize hook
    // const searchParams = useSearchParams();

    // Get Logged In User Details
 

    // Get Params
    // const projectStartDate: any = searchParams?.get('projectStartDate');
    // const hoursFrom: any = searchParams?.get('hoursFrom');
    // const hoursTo: any = searchParams?.get('hoursTo');

    const handleExportToExcel = async ({}) => {
      
        try {
            const projectReq: ProjectsReport = {
                PageNumber:0,
                PageSize:0,
                StartDate: param.StartDate,
                From: param.From,
                To: param.To,
                DepartmentId: param.DepartmentId,
                SearchValue: '',
                TeamAdminId: param.TeamAdminId,
                SortColumn: '',
                SortOrder: ''
            };

            const response = await projectsReport(projectReq);

            // Check for successful response
            if (response.results != null) {
                const worksheet = XLSX.utils.json_to_sheet(response.results);
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

export default ProjectExcelReport;