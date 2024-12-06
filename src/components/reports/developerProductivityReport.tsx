'use client';
import React, { useState } from 'react';
import DateFilter from './developerProductiveDateFilter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ReportPagination from './developerReportPagination';
import ReportDetailsButton from './reportDetailsButton';
import Link from 'next/link';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const DeveloperReport = ({ developersReports, param }: any) => {
  //Initialize hook
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = usePathname();

  const [searchInput, setSearchInput] = useState(param.SearchValue);
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
    setSortConfig({ key, direction });

    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&from=${param.From}&to=${param.To}&search=${param.SearchValue}&sortColumn=${key}&sortOrder=${direction}`
    );
  };

  // const showingRecordCount = () => {
  //   const Count =
  //     (param.PageNumber - 1) * param.PageSize +
  //       Math.ceil(developersReports?.results?.length) <=
  //     developersReports?.totalCount
  //       ? (param.PageNumber - 1) * param.PageSize +
  //         Math.ceil(developersReports?.results?.length)
  //       : developersReports?.totalCount;

  //   return Count;
  // };

  const showingRecordCount = () => {
    const totalCount = developersReports?.totalCount || 0;
    const currentPage = param.PageNumber || 1;
    const pageSize = param.PageSize || 10;

    const pageStart = (currentPage - 1) * pageSize + 1;
    const pageEnd = Math.min(currentPage * pageSize, totalCount);

    return { pageStart, pageEnd, totalCount };
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
    return data?.results.reduce(
      (total: any, item: any) => total + item.totalUpworkHours,
      0
    );
  };

  const calculateTotalFixedHours = (data: any) => {
    return data?.results.reduce(
      (total: any, item: any) => total + item.totalFixedHours,
      0
    );
  };
  const calculateTotalOfflineHours = (data: any) => {
    return data?.results.reduce(
      (total: any, item: any) => total + item.totalOfflineHours,
      0
    );
  };
  const calculateTotalBillingHours = (data: any) => {
    return data?.results.reduce(
      (total: any, item: any) => total + item.totalBillingHours,
      0
    );
  };
  const totalUpworkHours = numberToTimeConversion(
    calculateTotalUpworkHours(developersReports)
  );
  const totalOfflineHours = numberToTimeConversion(
    calculateTotalOfflineHours(developersReports)
  );
  const totalFixedHours = numberToTimeConversion(
    calculateTotalFixedHours(developersReports)
  );
  const totalBillingHours = numberToTimeConversion(
    calculateTotalBillingHours(developersReports)
  );
  const handleEntries = (e: any) => {
    const showValue = e.target.value;

    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${showValue}&from=${param.From}&to=${param.To}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}`
    );
  };
  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchInput(search);
    router.push(
      `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&from=${param.From}&to=${param.To}&search=${search}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}`
    );
  };
  return (
    <>
      <div id="DeveloperReport" role="tabpanel">
        <div className="card custom-card team_card">
          <div className="card-header justify-content-between awards_card_header">
            <div className="card-title">Developer Productivity Report</div>
            <div className="filter-right d-flex gap-x-2">
              <DateFilter param={param} />
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive theme_table">
              <div className="d-flex flex-wrap justify-content-between dataTable_filterBox">
                <div className="d-flex gap-x-2 align-items-center mb-4">
                  Show
                  <select className="form-control w70" onChange={handleEntries}>
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
                    placeholder="Search Here"
                    value={searchInput}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="table-responsive theme_table">
                <table className="table text-nowrap table-hover border table-bordered">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('fullName')}>
                        Developer Name{' '}
                        {sortConfig.key === 'fullName' ? (
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

                      {/* 
                  <th>Worked on Projects</th> */}
                      <th>Details</th>
                    </tr>
                  </thead>
                  {developersReports != undefined && (
                    <tbody>
                      {developersReports?.results.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <Link
                              href={`/employees/${item.employeeID}`}
                              className="btn btn-link text-primary"
                            >
                              {item.fullName}
                            </Link>

                            <td>
                              {numberToTimeConversion(item.totalUpworkHours)}
                            </td>
                            <td>
                              {numberToTimeConversion(item.totalFixedHours)}
                            </td>
                            <td className="text-success text-bold">
                              <b>
                                {numberToTimeConversion(item.totalBillingHours)}
                              </b>
                            </td>
                            <td className="text-danger">
                              {numberToTimeConversion(item.totalOfflineHours)}
                            </td>
                            <td className="worked_status">
                              {item.projectNames}
                            </td>
                            <td>
                              <ReportDetailsButton
                                employeeId={item.employeeId}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  )}
                  {developersReports != undefined && (
                    <tfoot>
                      <tr>
                        <td className="text-bold">Total </td>
                        <td>{totalUpworkHours}</td>
                        <td>{totalFixedHours}</td>
                        <td className="text-success text-bold">
                          {totalBillingHours}
                        </td>
                        <td className="text-danger">{totalOfflineHours}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
                {developersReports == undefined && <p>No record found</p>}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex align-items-center pagination_layout">
              {developersReports?.totalCount > 0 && (
                <div>
                  Showing {showingRecordCount().pageStart} to{' '}
                  {showingRecordCount().pageEnd} of{' '}
                  {showingRecordCount().totalCount} Entries
                </div>
              )}

              <div className="ms-auto">
                <nav>
                  {developersReports?.totalCount > 0 && (
                    <ReportPagination
                      totalRecords={developersReports?.totalCount}
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
export default DeveloperReport;
