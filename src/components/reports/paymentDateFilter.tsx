'use client';

import { paymentPendingReport } from '@/utils/publicApi';
import { PaymentPendingReport } from '@/utils/types';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as XLSX from 'xlsx';
const PaymentDateFilter = () => {
  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab');
  let paymentPendingReports: any;
  const handleSearch = (e: any) => {
    const search = e.target.value;
    router.push(`${url}?tab=${activeTab}&search=${search}`);
  };
  const handleExportToExcel = async ({}) => {
    try {
      const paymentPendingReportReq: PaymentPendingReport = {
        teamAdminId: '',
        departmentId: 0,
        searchText: '',
      };
      try {
        paymentPendingReports = await paymentPendingReport(
          paymentPendingReportReq
        );
      } catch (error) {}

      if (paymentPendingReports != null) {
        const formattedData = paymentPendingReports
          .map((project: any) => {
            return project.modulesList.map((module: any) => ({
              'PROJECT NAME': project.projectName,
              MODULE: module.moduleName,
              'DEADLINE DATE': module.deadlineDate,
              'APPROVED HOURS': module.approvedHours,
              'BILLED HOURS': module.billingHours,
              'LEFT HOURS': module.leftHours,
              'MODULE STATUS': module.moduleStatus,
              'PAYMENT STATUS': module.paymentStatus,
            }));
          })
          .flat();

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'DataSheet.xlsx');
        toastr.success('File downloaded successfully', '', {
          timeOut: 1000,
        });
      } else {
        toastr.error('Failed to download file', '', {
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
    <div className='filter-right d-flex gap-x-2'>
      <div className='search_box'>
        <i className='ri-search-line'></i>
        <input
          className='form-control form-control-sm'
          type='text'
          placeholder='Search Here'
          onChange={handleSearch}
        />
      </div>
      <div className='btn-list mt-md-0 mt-2'>
        <button
          className='btn'
          style={{ backgroundColor: '#7952b3', color: 'white' }}
          onClick={handleExportToExcel}
        >
          <i className='bi bi-file-excel-fill'></i> Export to Excel
        </button>
      </div>
    </div>
  );
};
export default PaymentDateFilter;
