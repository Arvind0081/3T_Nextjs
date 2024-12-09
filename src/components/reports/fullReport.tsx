'use client';
import { useState,useEffect } from 'react';
import { format } from 'date-fns';

import FullExcelReport from './fullReportDateFilter';
import {
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/dist/client/components/navigation';
const FullReport = ({
  fullReportRes,
  employeeList,
  projects,
  clients,
  param,
  monthlyReportRes,
}: any) => {
  const [showMonthlyHours, setShowMonthlyHours] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const toggleView = () => {
    setShowMonthlyHours(true); 
  };

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };
  console.log('filtersChanged',filtersChanged)

  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();

  //Get Params
  const activeTab = searchParams.get('tab');

  //Declare State
  const [currentHoursFrom, setCurrentHoursFrom] = useState<any>(param.From);
  const [currentHoursTo, setCurrentHoursTo] = useState<any>(param.To);



  const handleFilterChange = (newParamKey: string, newValue: any) => {
    setFiltersChanged(true);
    setShowMonthlyHours(false); // Reset to full report on filter change
    router.push(
      `${url}?tab=${activeTab}&employeeId=${
        newParamKey === 'employeeId' ? newValue : param.EmployeeId
      }&projectId=${
        newParamKey === 'projectId' ? newValue : param.ProjectId
      }&clientId=${
        newParamKey === 'clientId' ? newValue : param.ClientId
      }&from=${newParamKey === 'from' ? newValue : param.From}&to=${
        newParamKey === 'to' ? newValue : param.To
      }&teamAdminId=${param.TeamAdminId}&departmentId=${param.DepartmentId}`
    );
  };


  const handleHoursFrom = (e: any) => {
    setCurrentHoursFrom(e.target.value);
    handleFilterChange('from', e.target.value);
  };

  const handleHoursTo = (e: any) => {
    setCurrentHoursTo(e.target.value);
    handleFilterChange('to', e.target.value);
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange('employeeId', e.target.value);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange('projectId', e.target.value);
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange('clientId', e.target.value);
  };

  useEffect(() => {
    // Reset filtersChanged to false after initial page load
    setFiltersChanged(false);
  }, []);

  return (
    <>
      <div id='FullReport' role='tabpanel'>
        <div className='card custom-card team_card employee_status'>
          <div className='card-header justify-content-between awards_card_header'>
            <div className='filter-left d-flex gap-x-2'>
              <div className='selectbox select_designation'>
                <select
                  className='form-control'
                  onChange={handleEmployeeChange}
                >
                  <option value=''>Select Employee</option>
                  {employeeList?.map((employee: any) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='selectbox select_designation'>
                <select className='form-control' onChange={handleProjectChange}>
                  <option value=''>Select Project</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='selectbox select_designation me-2'>
                <select className='form-control' onChange={handleClientChange}>
                  <option value=''>Select Client</option>
                  {clients?.map((client: any) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='align-items-end d-flex gap-x-2 selectbox'>
                <p className='fw-semibold mb-2'>From:</p>
                <div className='input-group date-selectbox'>
                  <input
                    type='date'
                    className='form-control'
                    value={currentHoursFrom}
                    onChange={handleHoursFrom}
                  />
                </div>
              </div>

              <div className='align-items-end d-flex gap-x-2 selectbox'>
                <p className='fw-semibold mb-2'>To:</p>
                <div className='input-group date-selectbox'>
                  <input
                    type='date'
                    className='form-control'
                    value={currentHoursTo}
                    onChange={handleHoursTo}
                  />
                </div>
              </div>
            </div>
            <div className='filter-right d-flex gap-x-2'>
              <div className='filter-right d-flex gap-x-2'>
              <button
                type='button'
                className='btn btn-primary btn-wave'
                onClick={toggleView}
              >
                  {showMonthlyHours ? '' : ''} Monthly Reports
                </button>
              </div>
              <FullExcelReport param={param} showMonthlyHours={showMonthlyHours} />
            </div>
          </div>

          {showMonthlyHours ? (
            <div className='card-body Upwork_table employee_table2'>
              <div className='table-responsive theme_table theme_table_sm'>
                <table className='table text-nowrap table-hover border table-bordered'>
                  <thead>
                    <tr>
                      <th scope='col'>Month</th>
                      <th scope='col' className='project-width'>
                        Upwork Hours
                      </th>
                      <th scope='col'>Fixed Billing Hours</th>
                      <th scope='col' className='module-width'>
                        Non Billable Hours
                      </th>
                      <th scope='col' className='profile-width'>
                        Productive Hours
                      </th>
                      <th scope='col' className='memo-width'>
                        Monthly Potential Hours{' '}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReportRes?.map((item: any, index: number) => (
                      <tr key={`report-${index}`}>
                        <td>
                          <b>{item.month}</b>
                        </td>
                        <td>{item.upworkHours}</td>
                        <td>{item.fixedHours}</td>
                        <td>{item.offlineHours}</td>
                        <td>{item.productiveHours}</td>
                        <td>{item.monthlyPotentialHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!monthlyReportRes && <span>No Record Found.</span>}
              </div>
            </div>
          ) : (
            <div className='card-body Upwork_table employee_table'>
              <div className='table-responsive theme_table theme_table_sm'>
                <table className='table text-nowrap table-hover border table-bordered'>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col' className='project-width'>
                        Project Name
                      </th>
                      <th scope='col'>Client Name</th>
                      <th scope='col' className='module-width'>
                        Module
                      </th>
                      <th scope='col' className='profile-width'>
                        Profile
                      </th>
                      <th scope='col' className='memo-width'>
                        Memo{' '}
                      </th>
                      <th scope='col'>Upwork Hours</th>
                      <th scope='col'>Fixed Billing Hours</th>
                      <th scope='col'>Non Billable Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullReportRes?.map((item: any, index: any) => (
                      <>
                        <tr key='mainusers'>
                          <td colSpan={10} className='maindate'>
                            <span className='badge'>
                              {format(new Date(item.date), 'dd/MM/yyyy')}
                            </span>
                          </td>
                        </tr>
                        {item.reportViewModel.map(
                          (reportItem: any, reportIndex: number) => (
                            <tr key={`report-${index}-${reportIndex}`}>
                              <td>
                                <b>{reportItem.employee}</b>
                              </td>
                              <td>{reportItem.projectName}</td>
                              <td>{reportItem.client}</td>
                              <td>{reportItem.module}</td>
                              <td>{reportItem.profile}</td>
                              <td>
                                <div className='memo_ellipse'>
                                  {reportItem.memo}
                                </div>
                              </td>
                              <td>
                                {numberToTimeConversion(reportItem.upworkHours)}
                              </td>
                              <td>
                                {numberToTimeConversion(reportItem.fixedHours)}
                              </td>
                              <td className='text-danger'>
                                {numberToTimeConversion(
                                  reportItem.nonBillableHours
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </>
                    ))}
                   
                  </tbody>
                
                </table>
                {!fullReportRes && <span>No Record Found.</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FullReport;
