'use client';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx';
import { hrMonthlyReports } from '@/utils/publicApi';
import { useSearchParams } from 'next/navigation';
import { MonthlyReportsByHr } from '@/utils/types';

const ExportExcel = ({ param }: any) => {
  const searchParams = useSearchParams();
  let dateStr = searchParams.get('month');

  if (dateStr == undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    dateStr = `${year}-${month}`;
  }
  let [year, month] = dateStr.split('-');

  const handleExportToExcel = async () => {
    try {
      const attendance: MonthlyReportsByHr = {
        Month: Number(month),
        Year: Number(year),
        DepartmentId: param.DepartmentId,
        TeamAdminId: param.TeamAdminId,
        PageNumber: 0, // For full export
        PageSize: 0, // For full export
        SearchValue: '',
        date: ''
      };

      // Fetch data from the API
      const response = await hrMonthlyReports(attendance);

      if (response?.results?.length > 0) {
        // Extract relevant fields for Excel
        const data = response.results.map((employee: any) => ({
          Name: employee.employeeName,
          Present: employee.present,
          Absent: employee.absent,
          Leaves: employee.leaves,
          "Half Days": employee.halfDay,
        }));

        // Convert JSON to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Report');

        // Trigger file download
        XLSX.writeFile(workbook, 'Monthly_Report.xlsx');

        // Success notification
        toastr.success('File downloaded successfully', '', { timeOut: 1000 });
      } else {
        toastr.error('No data available to export', '', { timeOut: 1000 });
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
      className='btn'
      style={{ backgroundColor: '#7952b3', color: 'white' }}
      onClick={handleExportToExcel}
    >
      <i className='bi bi-file-excel-fill'></i> Export to Excel
    </button>
  );
};

export default ExportExcel;
