'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UpdateEmployeeStatus from '@/components/employees/updateEmployeeStatus';
import RemoveFromItem from '@/components/employees/removeFromItem';
import DeleteButton from '@/components/common/Delete/delete';
import Paginator from '@/components/employees/pagination';
import { useRouter, usePathname } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const TeamMember = ({
  initialEmployees,
  reqParams,
  empStatus,
  totalEntries,
}: any) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const url = usePathname();
  const [sortConfig, setSortConfig] = useState({
    key: reqParams.SortColumn || '',
    direction: reqParams.SortOrder || 'asc',
  });

  const handleSort = (key: string) => {
  
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    router.push(
      `${url}?page=${reqParams.pagenumber}&size=${reqParams.pageSize}&empStatus=${reqParams.isActive}&departmentId=${reqParams.departmentID}&teamAdminId=${reqParams.TeamAdminId}&designation=${reqParams.designation}&searchValue=${reqParams.searchValue}&sortColumn=${key}&sortOrder=${direction}`
    );
  };

  return (
    <div className='table-responsive theme_table'>
      <table className='table text-nowrap table-hover border table-bordered'>
        <thead>
          <tr>
            <th scope='col'>SR.No</th>

            <th scope='col'> Employee Id.</th>

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

            {/* <th onClick={() => handleSort('department')}>
              Department{' '}
              {sortConfig.key === 'department' ? (
                sortConfig.direction === 'asc' ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : (
                <FaSort />
              )}
            </th> */}

            <th onClick={() => handleSort('email')}>
              Email{' '}
              {sortConfig.key === 'email' ? (
                sortConfig.direction === 'asc' ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : (
                <FaSort />
              )}
            </th>

            <th scope='col'> Employee Status</th>

            <th scope='col'>Action</th>
          </tr>
        </thead>
        {initialEmployees?.model?.results ? (
          <tbody>
            {initialEmployees.model.results.map((emp: any, index: any) => {
              const serialNumber =
                (reqParams.pagenumber - 1) * reqParams.pageSize + index + 1;
              return (
                <tr key={emp.employeeID}>
                  <td>{serialNumber}</td> {/* Updated SR.No calculation */}
                  <td>{emp.employeeNumber}</td>
                  <td>
                    <span className='avatar avatar-sm me-2 avatar-rounded'>
                      {emp.profileImage ? (
                        <Image
                          src={`https://3t-api.csdevhub.com/images/${emp.profileImage}`}
                          alt='img'
                          height={50}
                          width={50}
                        />
                      ) : (
                        emp.employeeUserName
                          .split(' ')
                          .map((name: any) => name[0]?.toUpperCase())
                          .join('')
                      )}
                    </span>
                    <Link
                      href={`/employees/${emp.employeeID}`}
                      className='btn btn-link text-primary'
                    >
                      {emp.employeeUserName}
                    </Link>
                  </td>
                  <td>{emp.designation}</td>
                  {/* <td>{emp.department}</td> */}
                  <td>{emp.email}</td>
                  <td>
                    <UpdateEmployeeStatus emp={emp} empStatus={empStatus} />
                  </td>
                  <td>
                    <RemoveFromItem id={emp.employeeID} />
                    &nbsp;&nbsp;
                    <DeleteButton id={emp.employeeID} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className='text-center'>No record found.</td>
            </tr>
          </tbody>
        )}
      </table>
      <div className='card-footer'>
        <div className='d-flex align-items-center'>
          Showing Entries {totalEntries} out of{' '}
          {initialEmployees?.model?.totalCount ?? 0}
          <div className='ms-auto'>
          <Paginator
            totalRecords={initialEmployees?.model?.totalCount}
            payload={reqParams}
          />
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default TeamMember;
