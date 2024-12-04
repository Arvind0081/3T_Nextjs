'use client';
import React from 'react';
import ProjectStatuDateFilter from './projectStatuDateFilter';

const EmployeeStatus = ({ month, projectStatusList, profileInfo }: any) => {
  const numberToTimeConversion = (decimalTime: number) => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB');

  return (
    <div className='card custom-card'>
      <div className='card-body Upwork_table employee_table employee_status'>
        <div className='d-flex justify-content-end items-center'>
          <ProjectStatuDateFilter month={month} />
        </div>
        <div className='card-body Upwork_table employee_table'>
          <div className='table-responsive theme_table theme_table_sm'>
            <div className='card-title'>
              {profileInfo.firstName}&nbsp;{profileInfo.lastName} Project Detail
            </div>

            <table className='table text-nowrap table-hover border table-bordered'>
              <thead>
                <tr>
                  <th className='project-width'>Project Name</th>
                  <th scope='col'>Client Name</th>
                  <th scope='col' className='module-width'>
                    Module
                  </th>
                  <th scope='col' className='profile-width'>
                    Profile
                  </th>
                  <th scope='col' className='memo-width'>
                    Memo
                  </th>
                  <th scope='col'>Upwork Hours</th>
                  <th scope='col'>Fixed Billing Hours</th>
                  <th scope='col'>Billing Hours</th>
                  <th scope='col'>Non Billable Hours</th>
                </tr>
              </thead>
              <tbody>
                {projectStatusList && projectStatusList.length > 0 ? (
                  projectStatusList.map(
                    (status: any, index: number, arr: any[]) => {
                      const showDateRow =
                        index === 0 ||
                        formatDate(status.date) !==
                          formatDate(arr[index - 1].date);

                      return (
                        <React.Fragment key={index}>
                          {showDateRow && (
                            <tr>
                              <td colSpan={10} className='maindate'>
                                <div className='d-flex gap-x-2 badge align-items-center'>
                                  <span className=''>
                                    {formatDate(status.date)}
                                  </span>
                                  <span className='badge bg-primary-update'>
                                    Updated on:{' '}
                                    {formatDate(status.statusSubmitDate)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td>{status.projectName}</td>
                            <td>{status.clientName}</td>
                            <td>{status.moduleName}</td>
                            <td>{status.profileName}</td>
                            <td>
                              <div className='memo_ellipse'>
                                {status.memo
                                  .split('\r\n')
                                  .map((line: string, idx: number) => (
                                    <div key={idx}>{line}</div>
                                  ))}
                              </div>
                            </td>
                            <td>
                              {numberToTimeConversion(status.upworkHours)}
                            </td>
                            <td>{numberToTimeConversion(status.fixedHours)}</td>
                            <td className='text-success text-bold'>
                              <b>
                                {numberToTimeConversion(
                                  status.upworkHours + status.fixedHours
                                )}
                              </b>
                            </td>
                            <td className='text-danger'>
                              {numberToTimeConversion(status.offlineHours)}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td colSpan={10} className='text-center'>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatus;
