'use client';

import { workInHand } from '@/utils/publicApi';
import { WorkInHandReq } from '@/utils/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as XLSX from 'xlsx';
const WorkHandDateFilter = () => {
     
     const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab');
    let paymentPendingReports: any;
    // const handleDesignationChange = (
    //     event: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     const dep = event.target.value;
    //     router.push(`${url}?tab=${activeTab}&search=${dep}`);
    // };
     const handleSearch = (e: any) => {
        const search = e.target.value;
        router.push(
            `${url}?tab=${activeTab}&search=${search}`
        );
    };
    const handleExportToExcel = async ({}) => {
   
        try {
            //PaymentPendingReport  API Call

            const workInHandReq: WorkInHandReq = {
                TeamAdminId: '',
                DepartmentId: 0,
                SearchText: ''
            };
            try {
                paymentPendingReports = await workInHand(
                    workInHandReq
                );
            } catch (error) {}

            // Check for successful response
            if (paymentPendingReports != null) {
                // Map the data to the required format
                const formattedData = paymentPendingReports
                    .map((project: any) => {
                        return project.modules.map((module: any) => ({
                            'PROJECT NAME': module.projectName,
                            MODULE: module.moduleName,
                            'DEADLINE DATE': module.deadlineDate,
                            'APPROVED HOURS': module.approvedHours,
                            'BILLED HOURS': module.billedHours,
                            'LEFT HOURS': module.leftHours,
                            'MODULE STATUS': module.moduleStatus,
                            
                        }));
                    })
                    .flat(); // Flatten the array of arrays

                // Convert to worksheet
                const worksheet = XLSX.utils.json_to_sheet(formattedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

                // Write to file
                XLSX.writeFile(workbook, 'DataSheet.xlsx');

                // Display success message
                toastr.success('File downloaded successfully', '', {
                    timeOut: 1000,
                });
            } else {
                // toastr.error('Failed to download file', '', {
                //     timeOut: 1000,
                // });
            }
            
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toastr.error('An error occurred while exporting to Excel', '', {
                timeOut: 1000,
            });
        }
    };
    return (
        <div className="filter-right d-flex gap-x-2">
            {/* <div className="selectbox open_selectBox">
                <div>
                    <select
                        className="form-control"
                        // value={moduleItem.moduleStatus}
                        onChange={handleDesignationChange}
                    >
                        {projectModuleStatus?.map((item: any) => (
                            <option key={item.value} value={item.text}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>
            </div> */}
            <div className="search_box">
                <i className="ri-search-line"></i>
                <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    onChange={handleSearch}
                />
            </div>
            <div className="btn-list mt-md-0 mt-2">
                <button
                    className="btn"
                    style={{ backgroundColor: '#7952b3', color: 'white' }}
                    onClick={handleExportToExcel}
                >
                    <i className="bi bi-file-excel-fill"></i> Export to Excel
                </button>
            </div>
        </div>
    );
};
export default WorkHandDateFilter;