'use client';
import React, { useEffect, useState } from 'react';
import DateFilter from './projectReportDateFilter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ReportPagination from './projectProductivityPagination';
import Link from 'next/link';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const ProjectReport = ({ projectsReport, param }: any) => {
 
  //Initialize hook
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = usePathname();

   const [searchInput, setSearchInput] = useState(param.SearchValue);
   const [debounceSearchValue,setDebounceSearchValue]=useState('');
   const [projectsReports,setProjectsReports]=useState<any>();
   const [pageSize,setPageSize]=useState(param.PageSize)

   useEffect(()=>{
    if(projectsReport){
      setProjectsReports(projectsReport);
    }else{
      setProjectsReports([]);
    }
   
   },[projectsReport]);

  //Get Params
  const activeTab = searchParams?.get('tab');

  const showingRecordCount = () => {

      const Count =
      (param.PageNumber - 1) * param.PageSize +
        Math.ceil(projectsReports?.results?.length) <=
      projectsReports?.totalCount
        ? (param.PageNumber - 1) * param.PageSize +
          Math.ceil(projectsReports?.results?.length)
        : projectsReports?.totalCount;

    return Count;

    
   
  };

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };
  const calculateTotalUpworkHours = (data: any) => {
    return data?.results?.reduce(
      (total: any, item: any) => total + item.totalUpworkHours,
      0
    );
  };
  const calculateTotalOfflineHours = (data: any) => {
    return data?.results?.reduce(
      (total: any, item: any) => total + item.totalOfflineHours,
      0
    );
  };
  const calculateTotalFixedHours = (data: any) => {
    return data?.results?.reduce(
      (total: any, item: any) => total + item.totalFixedHours,
      0
    );
  };
  const calculateTotalBillingHours = (data: any) => {
    return data?.results?.reduce(
      (total: any, item: any) => total + item.totalBillingHours,
      0
    );
  };
  const totalUpworkHours = numberToTimeConversion(
    calculateTotalUpworkHours(projectsReports)
  );
  const totalOfflineHours = numberToTimeConversion(
    calculateTotalOfflineHours(projectsReports)
  );
  const totalFixedHours = numberToTimeConversion(
    calculateTotalFixedHours(projectsReports)
  );
  const totalBillingHours = numberToTimeConversion(
    calculateTotalBillingHours(projectsReports)
  );

  const [sortConfig, setSortConfig] = useState({
    key: param.SortColumn || '',
    direction: param.SortOrder || 'asc',
  });

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&projectStartDate=${param.StartDate}&from=${param.From}&to=${param.To}&search=${param.SearchValue}&sortColumn=${key}&sortOrder=${direction}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
    );
  };

  const handleEntries = (e: any) => {
    const showValue = e.target.value;
    setPageSize(showValue);
    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${showValue}&projectStartDate=${param.StartDate}&from=${param.From}&to=${param.To}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
    );
  };
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
    router.push(
      `${url}?tab=${activeTab}&pageNumber=${1}&pageSize=${param.PageSize}&projectStartDate=${param.StartDate}&from=${param.From}&to=${param.To}&search=${debounceSearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debounceSearchValue]);
  return (
    <>
      <div id='ProjectReport' role='tabpanel'>
        <div className='card custom-card team_card'>
          <div className='card-header justify-content-between awards_card_header'>
            <div className='card-title'>Project Productivity Report</div>
            <div className='filter-right d-flex gap-x-2'>
              <DateFilter param={param} />
            </div>
          </div>
          <div className='card-body'>
            <div>
              <div className='d-flex flex-wrap justify-content-between dataTable_filterBox'>
                <div className='d-flex gap-x-2 align-items-center mb-4'>
                  Show
                  <select value={pageSize} className='form-control w70' onChange={handleEntries}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                  </select>{' '}
                  entries
                </div>
                <div className='search_box mb-4'>
                  <i className='ri-search-line'></i>
                  <input
                    className='form-control'
                    type='text'
                    value={searchInput}
                    placeholder='Search Here'
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className='table-responsive theme_table'>
                <table className='table text-nowrap table-hover border table-bordered'>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('projectName')}>
                        Project Name{' '}
                        {sortConfig.key === 'projectName' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>

                      <th onClick={() => handleSort('clientName')}>
                        Client Name{' '}
                        {sortConfig.key === 'clientName' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>

                      <th onClick={() => handleSort('totalUpworkHours')}>
                        Upwork Hours{' '}
                        {sortConfig.key === 'totalUpworkHours' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>

                      <th onClick={() => handleSort('totalFixedHours')}>
                        Fixed Billing Hours{' '}
                        {sortConfig.key === 'totalFixedHours' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>

                      <th onClick={() => handleSort('totalBillingHours')}>
                        Billing Hours{' '}
                        {sortConfig.key === 'totalBillingHours' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>

                      <th onClick={() => handleSort('totalOfflineHours')}>
                        Non Billable Hours{' '}
                        {sortConfig.key === 'totalOfflineHours' ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>
                    </tr>
                  </thead>
                   
                    <tbody>
                      {projectsReports?.results?.map((item: any, index: any) => (
                        <tr key={index}>
                          <Link
                            href={`/projects/${item.projectId}`}
                            className='btn-link'
                          >
                            {item.projectName}{' '}
                          </Link>

                          <td>{item.clientName}</td>
                          <td>
                            {numberToTimeConversion(item.totalUpworkHours)}
                          </td>
                          <td>
                            {numberToTimeConversion(item.totalFixedHours)}
                          </td>
                          <td className='text-success text-bold'>
                            <b>
                              {numberToTimeConversion(item.totalBillingHours)}
                            </b>
                          </td>
                          <td className='text-danger'>
                            {numberToTimeConversion(item.totalOfflineHours)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 
                  {projectsReports?.results && (
                    <tfoot>
                      <tr>
                        <td className='text-bold'>Total </td>
                        <td></td>
                        {/* <td></td> */}
                        <td>{totalUpworkHours}</td>
                        <td>{totalFixedHours}</td>
                        <td className='text-success text-bold'>
                          <b>{totalBillingHours}</b>
                        </td>
                        <td className='text-danger'>{totalOfflineHours}</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
                {!projectsReports?.results && <p>No Record Found</p>}
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div className='d-flex align-items-center pagination_layout'>
              {projectsReports?.totalCount > 0 && (
                <div>
                  Total Showing Entries {showingRecordCount()} out of{' '}
                  {projectsReports?.totalCount ?? 0}
                  <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                </div>
              )}

              <div className='ms-auto'>
                <nav>
                  {projectsReports?.totalCount > 0 && (
                    <ReportPagination
                      totalRecords={projectsReports?.totalCount}
                      data={param}
                    />
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectReport;
