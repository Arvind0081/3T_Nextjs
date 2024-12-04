'use client';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx';
import { fullReport, monthlyHoursReport } from '@/utils/publicApi';
import { FullReportByManagerReq } from '@/utils/types';

const FullExcelReport = ({ param, showMonthlyHours }: any) => {
  const handleExportToExcel = async () => {
   
    try {
      const fullReportByManagerReq: FullReportByManagerReq = {
        EmployeeId: param.EmployeeId,
        DepartmentId: param.DepartmentId,
        TeamAdminId: param.TeamAdminId,
        ProjectId: param.ProjectId,
        ClientId: param.ClientId,
        From: param.From,
        To: param.To,
      };
  
      // Fetch data
      const fullReportRes = await fullReport(fullReportByManagerReq);
      const monthlyReportRes = await monthlyHoursReport(fullReportByManagerReq);
  
      const selectedReport = showMonthlyHours ? monthlyReportRes : fullReportRes;
  
      if (selectedReport && selectedReport.length > 0) {
        // Flatten the nested structure for Excel
        const flattenedData = showMonthlyHours
          ? selectedReport.map((entry: any) => ({
              Month: entry.month,
              UpworkHours: entry.upworkHours,
              FixedHours: entry.fixedHours,
              NonBillableHours: entry.offlineHours,
              ProductiveHours: entry.ProductiveHours,
              MonthlyPotentialHours: entry.monthlyPotentialHours,
            }))
          : selectedReport.flatMap((entry: any) =>
              entry.reportViewModel.map((item: any) => ({
                Date: entry.date,
                Employee: item.employee,
                EmployeeId: item.employeeId,
                Project: item.projectName,
                ProjectId: item.projectId,
                Client: item.client,
                ClientId: item.clientId,
                Module: item.module,
                ModuleId: item.moduleId,
                FixedHours: item.fixedHours,
                NonBillableHours: item.nonBillableHours,
                UpworkHours: item.upworkHours,
                Memo: item.memo,
              }))
            );
  
        // Convert data to a worksheet and download as Excel
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'DataSheet.xlsx');
  
        toastr.success('File downloaded successfully', '', {
          timeOut: 1000,
        });
      } else {
        toastr.error('No data available for export', '', {
          timeOut: 1000,
        });
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toastr.error('An error occurred while exporting to Excel', '', {
        timeOut: 1000,
      });
    }
  };
  

  return (
    <div className='btn-list mt-md-0 mt-2'>
      <button
        className='btn btn-primary btn-wave'
        style={{ backgroundColor: '#7952b3', color: 'white' }}
        onClick={handleExportToExcel}
      >
        <i className='bi bi-file-excel-fill'></i> Export to Excel
      </button>
    </div>
  );
};

export default FullExcelReport;
