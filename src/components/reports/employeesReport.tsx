'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import EmployeeExcel from './employeesReportExcel';
import { format } from 'date-fns';
import EmployeeReportPagination from './employeeReportPagination';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const EmployeesReport = ({ employeesReport, param }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = usePathname();
  const [searchInput, setSearchInput] = useState(param.SearchValue);

  //Get Params
  const activeTab = searchParams?.get('tab');

  const [sortConfig, setSortConfig] = useState({
    key: param.SortColumn || '',
    direction: param.SortOrder || 'asc',
  });

  const handleSort = (key: string) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    if (key === 'srNo') {
      const sortedResults = [...employeesReport.results].sort((a, b) => {
        const aIndex =
          (param.PageNumber - 1) * param.PageSize +
          employeesReport.results.indexOf(a);
        const bIndex =
          (param.PageNumber - 1) * param.PageSize +
          employeesReport.results.indexOf(b);
        return direction === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      });

      employeesReport.results = sortedResults;
    }

    setSortConfig({ key, direction });

    // Update URL for other columns
    if (key !== 'srNo') {
      router.push(
        `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&search=${param.SearchValue}&sortColumn=${key}&sortOrder=${direction}&teamAdminId=${param.TeamAdminId}&departmentId=${param.DepartmentId}`
      );
    }
  };

  // const showingRecordCount = () => {
  //   const Count =
  //     (param.PageNumber - 1) * param.PageSize +
  //       Math.ceil(employeesReport?.results?.length) <=
  //     employeesReport?.totalCount
  //       ? (param.PageNumber - 1) * param.PageSize +
  //         Math.ceil(employeesReport?.results?.length)
  //       : employeesReport?.totalCount;

  //   return Count;
  // };

  const showingRecordCount = () => {
    const totalCount = employeesReport?.totalCount || 0;
    const currentPage = param.PageNumber || 1;
    const pageSize = param.PageSize || 10;

    const pageStart = (currentPage - 1) * pageSize + 1;
    const pageEnd = Math.min(currentPage * pageSize, totalCount);

    return { pageStart, pageEnd, totalCount };
  };

  const handleEntries = (e: any) => {
    const showValue = e.target.value;
    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${showValue}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}&teamAdminId=${param.TeamAdminId}&departmentId=${param.DepartmentId}`
    );
  };

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchInput(search);
    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&search=${search}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}&teamAdminId=${param.TeamAdminId}&departmentId=${param.DepartmentId}`
    );
  };

  return (
    <>
      <div id='EmployeesReport' role='tabpanel'>
        <div className='card custom-card team_card'>
          <div className='card-header justify-content-between awards_card_header'>
            <div className='card-title'>Employees Profile Report</div>
            <div className='filter-right d-flex gap-x-2'>
              <div className='btn-list mt-md-0 mt-2'>
              <EmployeeExcel param={param} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive theme_table">
              <div className="d-flex flex-wrap justify-content-between dataTable_filterBox">
                <div className="d-flex gap-x-2 align-items-center mb-4">
                  Show
                  <select className="form-control w70" onClick={handleEntries}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                  entries
                </div>
                <div className="search_box mb-4">
                  <i className="ri-search-line"></i>
                  <input
                    className="form-control"
                    type="text"
                    value={searchInput}
                    placeholder="Search Here"
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <table className="table text-nowrap table-hover border table-bordered">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('srNo')}>
                      SR. No.{' '}
                      {sortConfig.key === 'srNo' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('employeeNumber')}>
                      Employee Id.{' '}
                      {sortConfig.key === 'employeeNumber' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('userName')}>
                      User Name{' '}
                      {sortConfig.key === 'userName' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('designation')}>
                      Designation{' '}
                      {sortConfig.key === 'designation' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('joiningDate')}>
                      Joining Date{' '}
                      {sortConfig.key === 'joiningDate' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('skills')}>
                      Skills{' '}
                      {sortConfig.key === 'skills' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('skypeMail')}>
                      Skype Id{' '}
                      {sortConfig.key === 'skypeMail' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>

                    <th onClick={() => handleSort('projectNames')}>
                      Worked on Projects{' '}
                      {sortConfig.key === 'projectNames' ? (
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
                  {employeesReport?.results.map((item: any, index: number) => {
                    const serialNumber =
                      sortConfig.key === 'srNo' &&
                      sortConfig.direction === 'desc'
                        ? employeesReport.results.length - index
                        : (param.PageNumber - 1) * param.PageSize + index + 1;

                    return (
                      <tr key={item.id}>
                        <td>{serialNumber}</td>
                        <td>{item?.employeeNumber}</td>
                        <td>
                          <div className="d-flex align-items-center fw-semibold">
                            <span className="avatar avatar-sm me-2 avatar-rounded">
                              <Image
                                src={`https://3t-api.csdevhub.com/images/${item?.profileImage}`}
                                alt="img"
                                height={20}
                                width={20}
                              />
                            </span>
                            {item?.userName}
                          </div>
                        </td>
                        <td>{item?.designation}</td>
                        <td>
                          {item?.joiningDate
                            ? format(new Date(item.joiningDate), 'yyyy-MM-dd')
                            : 'N/A'}
                        </td>
                        <td>{item?.skills || 'N/A'}</td>
                        <td>{item?.skypeMail || 'N/A'}</td>
                        <td>{item?.projectNames || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex align-items-center pagination_layout">
              {employeesReport?.totalCount > 0 && (
                <div>
                  Showing {showingRecordCount().pageStart} to{' '}
                  {showingRecordCount().pageEnd} of{' '}
                  {showingRecordCount().totalCount} Entries
                </div>
              )}

              <div className="ms-auto">
                <nav>
                  <EmployeeReportPagination
                    totalRecords={employeesReport?.totalCount}
                    data={param}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeesReport;
