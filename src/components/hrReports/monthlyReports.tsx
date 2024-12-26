"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DateFilter from "./dateFilter";
import ExportExcel from "./exportExcel";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MonthlyReportPagination from "./monthlyReportpagination";

const MonthlyReports = ({ monthlyReports, param}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = usePathname();
  const [searchInput, setSearchInput] = useState(param.SearchValue);
  const [debounceSearchValue, setDebounceSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(param.PageSize);

  const activeTab = searchParams?.get("tab");
  const showingRecordCount = () => {
    const totalCount = monthlyReports?.totalCount || 0;
    const currentPage = param.PageNumber || 1;
    const pageSize = param.PageSize || 10;

    const pageStart = (currentPage - 1) * pageSize + 1;
    const pageEnd = Math.min(currentPage * pageSize, totalCount);

    return { pageStart, pageEnd, totalCount };
  };

  const handleEntries = (e: any) => {
    const showValue = e.target.value;
    setPageSize(showValue);
    router.push(
      `${url}?tab=${activeTab}&month=${param.date}&departmentId=${param.DepartmentId}&pageNumber=${1}&pageSize=${showValue}&search=${param.SearchValue}&teamAdminId=${param.TeamAdminId}`
    );
  };

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchInput(search);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebounceSearchValue(searchInput);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    router.push(
      `${url}?tab=${activeTab}&month=${param.date}&departmentId=${param.DepartmentId}&pageNumber=${1}&pageSize=${param.PageSize}&search=${debounceSearchValue}&teamAdminId=${param.TeamAdminId}`
    );
  }, [debounceSearchValue]);

  return (
    <>
      <div className="card custom-card team_card">
        <div className="card-header justify-content-between awards_card_header">
          <div className="card-title">Monthly Leaves Report </div>
          <div className="filter-right d-flex gap-x-2">
            <DateFilter param={param}/>

            <div className="btn-list mt-md-0 mt-2">
              <ExportExcel param={param} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className="d-flex flex-wrap justify-content-between dataTable_filterBox">
              <div className="d-flex gap-x-2 align-items-center mb-4">
                Show
                <select
                  className="form-control w70"
                  value={pageSize}
                  onChange={handleEntries}
                >
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
          </div>
          <div className="table-responsive theme_table">
            <table className="table text-nowrap table-hover border table-bordered">
              <thead>
                <tr>
                  <th>Developer Name</th>
                  <th scope="col">Present</th>
                  <th scope="col">Absent</th>
                  <th scope="col">Leaves</th>
                  <th scope="col">Half Day</th>
                  {/* <th scope="col">Short Leave</th>
                                    <th scope="col">Weekends</th> */}
                </tr>
              </thead>
              <tbody>
                {monthlyReports?.results.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <a
                        href="#"
                        className="d-flex align-items-center fw-semibold"
                      >
                        <span className="avatar avatar-sm me-2 avatar-rounded">
                          {item.profileImage ? (
                            <Image src="/" width={20} height={20} alt="img" />
                          ) : (
                            <span
                              style={{
                                fontSize: "20px",
                                color: "#00000059",
                                textTransform: "uppercase",
                                padding: "19%",
                              }}
                            >
                              {item.employeeName?.substring(0, 1)}
                            </span>
                          )}
                        </span>
                        {item.employeeName}
                      </a>
                    </td>
                    <td className="text-success">{item.present}</td>
                    <td className="text-danger">{item.absent}</td>
                    <td> {item.leaves}</td>
                    <td> {item.halfDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card-footer">
            <div className="d-flex align-items-center pagination_layout">
              {monthlyReports?.totalCount > 0 && (
                <div>
                  Showing {showingRecordCount().pageStart} to{' '}
                  {showingRecordCount().pageEnd} of{' '}
                  {showingRecordCount().totalCount} Entries
                </div>
              )}

              <div className="ms-auto">
                <nav>
                 {monthlyReports?.results && <MonthlyReportPagination
                    totalRecords={monthlyReports?.totalCount}
                    data={param}
                  />}
                </nav>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MonthlyReports;
