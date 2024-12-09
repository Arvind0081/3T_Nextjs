'use client';
import React,{useState,useEffect} from 'react';
import { workInHand } from '@/utils/publicApi';
import { WorkInHandReq } from '@/utils/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as XLSX from 'xlsx';
const WorkHandDateFilter = ({param}:any) => {

  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab');
  const [searchInput, setSearchInput] = useState(param.SearchText);
  const [debounceSearchValue,setDebounceSearchValue]=useState('');

  
  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchInput(search);
    
  };


  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      setDebounceSearchValue(searchInput);
     
  }, 500);

  return () => clearTimeout(delayDebounceFn); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchInput]);

  useEffect(()=>{
    router.push(`${url}?tab=${activeTab}&search=${debounceSearchValue}&teamAdminId=${param.TeamAdminId}&departmentId=${param.DepartmentId}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debounceSearchValue]);
  const handleExportToExcel = async () => {

    try {
      const workInHandReq: WorkInHandReq = {
        TeamAdminId: param.TeamAdminId,
        DepartmentId: param.DepartmentId,
        SearchText: '',
      };

      // Fetch data from API
      const response = await workInHand(workInHandReq);

      if (response && Array.isArray(response.model)) {
        // Map and format the data
        const formattedData = response.model.flatMap((project: any) =>
          project.modules.map((module: any) => ({
            'PROJECT NAME': project.projectName || 'N/A',
            MODULE: module.moduleName || 'N/A',
            'DEADLINE DATE': module.deadlineDate || 'N/A',
            'APPROVED HOURS': module.approvedHours || 0,
            'BILLED HOURS': module.billedHours || 0,
            'LEFT HOURS': module.leftHours || 0,
            'MODULE STATUS': module.moduleStatus || 'N/A',
          }))
        );

        if (formattedData.length === 0) {
          toastr.error('No data available to export.', '', {
            timeOut: 1000,
          });
          return;
        }

        // Convert data to Excel format
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Save the Excel file
        XLSX.writeFile(workbook, 'WorkInHandReport.xlsx');

        // Show success message
        toastr.success('File downloaded successfully', '', {
          timeOut: 1000,
        });

        // Optional: Add any navigation or state update logic here
      } else {
        toastr.error('Failed to fetch data from the server.', '', {
          timeOut: 1000,
        });
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      // toastr.error('An error occurred while exporting to Excel.', '', {
      //     timeOut: 1000,
      // });
    }
  };

  return (
    <div className='filter-right d-flex gap-x-2'>
      {/* <div className='selectbox open_selectBox'>
                <div>
                    <select
                        className='form-control'
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
      <div className='search_box'>
        <i className='ri-search-line'></i>
        <input
          className='form-control form-control-sm'
          type='text'
          value={searchInput}
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
export default WorkHandDateFilter;
