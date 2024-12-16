'use client';
import React, { useState } from 'react';
import UpworkSearch from '@/components/upwork/upworkSearch';
import DeleteButton from '@/components/upwork/deleteButton';
import EditButton from '@/components/upwork/editButton';
import Paginator from '@/components/upwork/profilePagination';
import { useRouter, usePathname } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const ProfileTable = ({
  params,
  upworkprofilerecords,
  profileList,
  getDepartment,
  //totalEntries,
}: any) => {
  const router = useRouter();
  const url = usePathname();
  const [sortConfig, setSortConfig] = useState({
    key: params.sortColumn || '',
    direction: params.sortOrder || 'asc',
  });


  const startRecord = (params.pageNumber - 1) * params.pageSize + 1;
  const endRecord = Math.min(params.pageNumber * params.pageSize, upworkprofilerecords?.model?.totalCount);

  

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    router.push(
      `${url}?page=${params.pageNumber}&size=${params.pageSize}&search=${params.searchValue}&departmentId=${params.departmentID}&teamAdminId=${params.teamAdminId}&profileType=${params.profileType}&sortColumn=${key}&sortOrder=${direction}`
    );
  };

  return (
    <>
      <div className="col-sm-12 col-xl-6">
        <div className="card custom-card">
          <div className="card-header justify-content-between awards_card_header">
            <div className="card-title">Upwork Profile</div>
            <div className="filter-right d-flex gap-x-2">
              <div className="search_box">
                <i className="ri-search-line" />
                <UpworkSearch params={params} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive theme_table">
              <table className="table text-nowrap table-hover border table-bordered">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>
                      User Name{' '}
                      {sortConfig.key === 'name' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>
                    <th scope="col">Department</th>
                    <th scope="col">Profile Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upworkprofilerecords?.model.results.map((upwork: any) => (
                    <tr key={upwork.id}>
                      <td>{upwork.name} </td>
                      <td>{upwork.departmentName}</td>
                      <td>
                        {profileList?.find(
                          (profile: any) => profile.value === upwork.profileType
                        )?.text || 'Unknown'}
                      </td>

                      <td>
                        <div className='icon_btn_outer'>
                        <EditButton
                          id={upwork.id.toString()}
                          profileList={profileList}
                          getDepartment={getDepartment}
                        />
                        <DeleteButton id={upwork.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {upworkprofilerecords?.model.results.length === 0 && (
                    <span>No Record Found.</span>
                  )}
              <div className="card-footer">
                <div className="d-flex align-items-center">
                  {upworkprofilerecords?.model.results.length > 0 && <div>
                    <div>   Showing {startRecord} to {endRecord} of {upworkprofilerecords?.model?.totalCount} Entries </div>
                    {/* Showing {showingRecordCount().pageStart} to{' '}
                    {showingRecordCount().pageEnd} of{' '}
                    {showingRecordCount().totalCount} Entries */}
                  </div>}
                  &nbsp;
                  <div className='ms-auto'>
                  {upworkprofilerecords?.model.results.length > 0 && <Paginator
                    totalRecords={upworkprofilerecords?.model?.totalCount}
                    payload={params}
                  />}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileTable;
