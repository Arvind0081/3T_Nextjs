'use client';
import React, { useState } from 'react';
import DeleteButton from '@/components/clients/deleteButton';
import Paginator from '@/components/clients/clientPagination';
import EditButton from '@/components/common/Edit/editButton';
import { useRouter, usePathname } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const ClientTable = ({
  param,
  // totalEntries,
  allClients,
  department,
  showListContent,
}: any) => {debugger;
  const router = useRouter();
  // const searchParams = useSearchParams();
  const url = usePathname();
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
      `${url}/?showListContent=${param.showListContent}&page=${param.pageNumber}&size=${param.pageSize}&departmentId=${param.departmentID}&searchValue=${param.searchValue}&teamAdminId=${param.teamAdminId}&sortColumn=${key}&sortOrder=${direction}`
    );
  };

  const startRecord = (param.pageNumber - 1) * param.pageSize + 1;
  const endRecord = Math.min(param.pageNumber * param.pageSize, allClients?.model.totalCount);

  return (
    <>
      <div className='col-sm-12 col-xl-12'>
        <div
          className='card custom-card'
          // style={{ background: 'transparent' }}
        >
          {showListContent === 'true' ? (
            <div
              className='clientList_box card custom-card clientRight_Box bg-transparent'
              id='listContent'
            >
              <div className='card-body'>
                <div className='table-responsive theme_table'>
                  <table className='table text-nowrap table-hover border table-bordered'>
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('name')}>
                          Name{' '}
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

                        <th onClick={() => handleSort('billingAddress')}>
                          Billing Address{' '}
                          {sortConfig.key === 'billingAddress' ? (
                            sortConfig.direction === 'asc' ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>

                        <th onClick={() => handleSort('skypeid')}>
                          Skype Id{' '}
                          {sortConfig.key === 'skypeid' ? (
                            sortConfig.direction === 'asc' ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>

                        <th onClick={() => handleSort('country')}>
                          Country{' '}
                          {sortConfig.key === 'country' ? (
                            sortConfig.direction === 'asc' ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>

                        <th onClick={() => handleSort('clientCompanyName')}>
                          Company Name{' '}
                          {sortConfig.key === 'clientCompanyName' ? (
                            sortConfig.direction === 'asc' ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>

                        <th scope='col'>Department</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allClients?.model.results.map((client: any) => (
                        <tr key={client.id}>
                          <td>{client.name}</td>
                          <td>{client.email}</td>
                          <td>{client.billingAddress}</td>
                          <td>{client.skypeid}</td>
                          <td>{client.country}</td>
                          <td>{client.clientCompanyName}</td>
                          <td>
                            {
                              department.filter(
                                (item: any) =>
                                  item.id == Number(client.departmentId)
                              )[0].name
                            }
                          </td>

                          <td>
                            <div className='icon_btn_outer'>
                            <EditButton 
                              id={client.id.toString()}
                              department={department}
                            />
                            <DeleteButton id={client.id.toString()} />
                            </div>
                          </td>
                          
                        </tr>
                      ))}
                     
                    </tbody>
                  </table>
                  {!allClients && (
                        <span>
                          No Record Found.
                        </span>
                      )}
                  <div className='card-footer'>
                    <div className='d-flex align-items-center'>
                    {allClients && <div>   Showing {startRecord} to {endRecord} of {allClients?.model.totalCount} Entries </div>}
                      {/* Showing Entries {totalEntries}
                      out of {allClients?.model.totalCount ?? 0}
                      &nbsp; */}
                      <div className='ms-auto'>
                     {allClients && <Paginator
                        totalRecords={allClients?.model.totalCount}
                        payload={param}
                      />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className=' clientList_box card custom-card clientRight_Box bg-transparent'
              id='GridContent'
            >
              <div className='clientList_Content'>
                {allClients?.model.results.map((client: any) => (
                  <div key={client.id} className='card custom-card status-card'>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between gap-2'>
                        <div className='fs-12'>
                          <p className='fw-semibold mb-1 d-flex align-items-center fs-13 gap-x-2'>
                            {client.name}
                          </p>

                          <p className='mb-1'>
                            Email :
                            <span className='mb-1 text-muted'>
                              {client.email}
                            </span>
                          </p>

                          <p className='mb-1'>
                            Billing Address :
                            <span className='mb-1 text-muted'>
                              {client.billingAddress}
                            </span>
                          </p>

                          <p className='mb-1'>
                            Skype Id :
                            <span className='mb-1 text-muted'>
                              {client.skypeid}
                            </span>
                          </p>

                          <p className='mb-1'>
                            Country :
                            <span className='mb-1 text-muted'>
                              {client.country}
                            </span>
                          </p>

                          <p className='mb-1'>
                            Company Name :
                            <span className='mb-1 text-muted'>
                              {client.clientCompanyName}
                            </span>
                          </p>

                          <p className='mb-1'>
                            Department :
                            <span className='mb-1 text-muted'>
                              {
                                department.filter(
                                  (item: any) =>
                                    item.id == Number(client.departmentId)
                                )[0].name
                              }
                            </span>
                          </p>

                          <td>
                            <EditButton
                              id={client.id.toString()}
                              department={department}
                            />
                            <DeleteButton id={client.id.toString()} />
                          </td>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ClientTable;
