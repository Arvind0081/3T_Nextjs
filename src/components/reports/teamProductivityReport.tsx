'use client';
import { useState } from 'react';
import {
  AccordionTitle,
  AccordionContent,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import DateFilter from './teamProductivityDateFilter';
import ProgressReportButton from './progressReportButton';

const TeamProductivityReport = ({ teamReport }: any) => {
  const [activeIndex, setActiveIndex] = useState();
  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };
  const calculateTotalUpworkHours = (data: any) => {
    const upworkHours = data?.employeeDetails?.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.upworkHours,
      0
    );
    return upworkHours;
  };
  const calculateTotalFixedHours = (data: any) => {
    const fixedHours = data?.employeeDetails?.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.fixedHours,
      0
    );
    // return data?.reduce((total: any, team: any) => {
    //     const teamFixedHours = team.employeeDetails.reduce(
    //         (teamTotal: any, employee: any) =>
    //             teamTotal + employee.fixedHours,
    //         0
    //     );
    //     return total + teamFixedHours;
    // }, 0);
    return fixedHours;
  };
  const calculateTotalOfflineHours = (data: any) => {
    const offlineHours = data?.employeeDetails?.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.offlineHours,
      0
    );
    // return data?.reduce((total: any, team: any) => {
    //     const teamOfflineHours = team.employeeDetails.reduce(
    //         (teamTotal: any, employee: any) =>
    //             teamTotal + employee.offlineHours,
    //         0
    //     );
    //     return total + teamOfflineHours;
    // }, 0);
    return offlineHours;
  };

  const calculateTotalBillingHours = (data: any) => {
    const billingHours = data?.employeeDetails?.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.billingHours,
      0
    );
    return billingHours;
  };

  const totalUpworkHours = (data: any) => {
    return numberToTimeConversion(calculateTotalUpworkHours(data));
  };
  const totalOfflineHours = (data: any) => {
    return numberToTimeConversion(calculateTotalOfflineHours(data));
  };

  const totalFixedHours = (data: any) => {
    return numberToTimeConversion(calculateTotalFixedHours(data));
  };
  const totalBillingHours = (data: any) => {
    return numberToTimeConversion(calculateTotalBillingHours(data));
  };

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };



  return (
    <>
      <div id='TeamReport' role='tabpanel'>
        <div className='card custom-card team_card'>
          <div className='card mb-3'>
            <div className='card-header justify-content-between awards_card_header'>
              <div className='card-title'>Team Productivity Report</div>
              <div className='filter-right d-flex gap-x-2'>
                <DateFilter />
              </div>
            </div>
            {teamReport?.length > 0 ? (
              teamReport.map((team: any, teamIndex: number) => (
                <Accordion key={teamIndex} fluid styled>
                  <AccordionTitle
                    active={activeIndex === teamIndex}
                    index={teamIndex}
                    onClick={(e, titleProps) => handleClick(e, titleProps)}
                  >
                    <Icon name='dropdown' />
                    {team.teamLeaderName}
                  </AccordionTitle>
                  <AccordionContent active={activeIndex === teamIndex}>
                    <div className='card-body'>
                      <div className='mb-3'>
                        {/* <div className='d-flex justify-content-between w-100 align-items-center flex-wrap'>
                                                    <h6 className='text-semi-bold text-underline'>
                                                        {team.teamLeaderName}
                                                    </h6>
                                                </div> */}
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover border table-bordered'>
                            <thead>
                              <tr>
                                <th>Developer Name</th>
                                <th scope='col'>Upwork Hours</th>
                                <th scope='col'>Fixed Billing Hours</th>
                                <th scope='col'>Billing Hours</th>
                                <th scope='col'>Non Billable Hours</th>
                                <th scope='col'>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {team.employeeDetails?.map(
                                (employeeDetails: any, empIndex: number) => (
                                  <tr key={`${teamIndex}-${empIndex}`}>
                                    <td>{employeeDetails.name}</td>
                                    <td>{numberToTimeConversion(employeeDetails.upworkHours)}</td>
                                    <td>{numberToTimeConversion(employeeDetails.fixedHours)}</td>
                                    <td className='text-success text-bold'>
                                      <b>{numberToTimeConversion(employeeDetails.billingHours)}</b>
                                    </td>
                                    <td>
                                      <span className='text-danger'>
                                        {numberToTimeConversion(employeeDetails.offlineHours)}
                                      </span>
                                    </td>
                                    <td>
                                        <ProgressReportButton id={
                                                                    employeeDetails.id
                                                                }  />
                                      {/* <a
                                        aria-label='anchor'
                                        href='javascript:void(0);'
                                        className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text'
                                        data-bs-target='#ProgressReport'
                                        data-bs-toggle='modal'
                                      >
                                        View
                                      </a> */}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                            <tfoot>
                              <tr key={`${teamIndex}`}>
                                <td className='text-bold'>Total Hours</td>
                                <td>{totalUpworkHours(team)}</td>
                                <td>{totalFixedHours(team)}</td>
                                <td className='text-success text-bold'>
                                  {totalBillingHours(team)}
                                </td>
                                <td>
                                  <span className='text-danger text-bold'>
                                    <b>{totalOfflineHours(team)}</b>
                                  </span>
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className='card-footer'>
                      <table className='table text-nowrap table-hover border table-bordered'></table>
                    </div>
                  </AccordionContent>
                </Accordion>
              ))
            ) : (
              <p>No record found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TeamProductivityReport;
