'use client';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx';
import { employeesAttendanceReport } from '@/utils/publicApi';
import { EmployeesAttendanceReport } from '@/utils/types';

const EmployeeExcel = () => {

    const handleExportToExcel = async ({}) => {
   
        try {
            const projectReq: EmployeesAttendanceReport = {
                PageNumber: 0,
                PageSize: 0,
                DepartmentId: 0,
                SearchValue: '',
                TeamAdminId: '',
                SortColumn: '',
                SortOrder: ''
            };

            const response = await employeesAttendanceReport(projectReq);

            if (response.results != null) {
                const worksheet = XLSX.utils.json_to_sheet(response.results);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'DataSheet.xlsx');
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

export default EmployeeExcel;
